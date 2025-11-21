import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 8000;

// ============================================================================
// SECURITY & MIDDLEWARE
// ============================================================================

// Enhanced security headers - production-ready
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'development' ? false : {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.google.com", "https://www.gstatic.com", "https://js.stripe.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https://*.firebaseapp.com", "https://*.googleapis.com", "https://*.stripe.com"],
      fontSrc: ["'self'", "data:", "https://fonts.googleapis.com", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'", "https://www.google.com", "https://js.stripe.com"],
    },
  },
  crossOriginEmbedderPolicy: false,
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  noSniff: true,
  xssFilter: true,
  hidePoweredBy: true,
}));

// CORS configuration - production whitelist
const allowedOrigins = [
  'http://localhost:5000',
  'http://localhost:3000',
  'https://skatehubba.com',
  'https://www.skatehubba.com',
  process.env.PRODUCTION_URL,
  ...(process.env.REPLIT_DOMAINS?.split(',') || [])
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (process.env.NODE_ENV === 'development') {
      if (origin.includes('.replit.dev') || origin.includes('.replit.app') || origin.includes('localhost')) {
        return callback(null, true);
      }
    }
    if (allowedOrigins.includes(origin)) return callback(null, true);
    if (process.env.NODE_ENV === 'development') return callback(null, true);
    callback(new Error('CORS policy violation'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
}));

// Compression & JSON parsing
app.use(compression());
app.use(express.json({ limit: '10mb' }));

// Request ID middleware for tracing
app.use((req, res, next) => {
  req.id = req.headers['x-request-id'] || uuidv4();
  res.setHeader('X-Request-ID', req.id);
  res.setHeader('X-API-Version', '1.0.0');
  res.setHeader('X-Timestamp', new Date().toISOString());
  next();
});

// ============================================================================
// DATABASE & SERVICES
// ============================================================================

let db, storage, sendSubscriberNotification, NewSubscriberInput, setupAuthRoutes, feedback, insertFeedbackSchema;

async function initializeDatabase() {
  try {
    const dbModule = await import('./db.ts');
    const storageModule = await import('./storage.ts');
    const emailModule = await import('./email.ts');
    const schemaModule = await import('@skatehubba/db');
    
    await import('./admin.ts');
    
    db = dbModule.db;
    storage = storageModule.storage;
    sendSubscriberNotification = emailModule.sendSubscriberNotification;
    NewSubscriberInput = schemaModule.NewSubscriberInput;
    setupAuthRoutes = schemaModule.setupAuthRoutes || (() => {});
    feedback = schemaModule.feedback;
    insertFeedbackSchema = schemaModule.insertFeedbackSchema;
    
    console.log("🎯 Database integration loaded successfully");
    
    if (dbModule.initializeDatabase) {
      await dbModule.initializeDatabase();
    }
    
  } catch (error) {
    console.warn("⚠️  Database integration failed, running in basic mode:", error.message);
  }
}

// ============================================================================
// HEALTH CHECK ENDPOINTS - PRODUCTION CRITICAL
// ============================================================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: 'ok',
    env: process.env.NODE_ENV || 'development',
    time: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0'
  });
});

// Readiness probe - checks database connectivity
app.get("/api/ready", async (req, res) => {
  try {
    const dbModule = await import('./db.ts');
    const isHealthy = await dbModule.checkDatabaseHealth?.();
    
    if (!isHealthy) {
      return res.status(503).json({
        status: 'not_ready',
        reason: 'database_unavailable',
        time: new Date().toISOString()
      });
    }
    
    res.status(200).json({
      status: 'ready',
      time: new Date().toISOString()
    });
  } catch (error) {
    console.error("❌ Readiness check failed:", error);
    res.status(503).json({
      status: 'not_ready',
      reason: 'service_error',
      time: new Date().toISOString()
    });
  }
});

// Liveness probe - checks if server is running
app.get("/api/live", (req, res) => {
  res.status(200).json({
    status: 'alive',
    time: new Date().toISOString()
  });
});

// API documentation endpoint
app.get("/api", (req, res) => {
  res.json({
    name: "SkateHubba API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      readiness: "/api/ready",
      liveness: "/api/live",
      subscribe: "POST /api/subscribe",
      feedback: "POST /api/feedback"
    }
  });
});

// ============================================================================
// ROUTES
// ============================================================================

app.get("/api/subscribe", (_req, res) => {
  res.status(200).json({ 
    ok: true, 
    msg: "Use POST method to subscribe" 
  });
});

app.post("/api/subscribe", async (req, res) => {
  try {
    const { email, firstName } = req.body;
    
    if (!email || !email.includes('@')) {
      return res.status(400).json({ ok: false, error: "Valid email is required" });
    }

    if (storage) {
      const existing = await storage.getSubscriber(email);
      if (existing) {
        return res.status(200).json({ 
          ok: true, 
          status: "exists", 
          msg: "You're already on the beta list!" 
        });
      }

      const created = await storage.createSubscriber({
        email,
        firstName: firstName || null,
        isActive: true,
      });

      if (sendSubscriberNotification) {
        await sendSubscriberNotification({ firstName: firstName || "", email });
      }

      console.log(`📧 New subscriber: ${firstName || 'Anonymous'} <${email}> [ID: ${created.id}]`);
      
      return res.status(201).json({ 
        ok: true, 
        status: "created", 
        id: created.id,
        msg: "Welcome to the beta list!" 
      });
    }
    
    res.json({ ok: true, status: "created", msg: "Welcome to the beta list!" });
  } catch (error) {
    console.error("❌ Subscription error:", error);
    res.status(500).json({ ok: false, error: "Failed to process subscription" });
  }
});

app.post("/api/feedback", async (req, res) => {
  try {
    const { type, message } = req.body;
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ ok: false, error: "Feedback message is required" });
    }

    console.log(`📝 Feedback received: Type=${type || 'general'}, Message=${message.substring(0, 50)}...`);
    
    res.json({ ok: true, msg: "Feedback received" });
  } catch (error) {
    console.error("❌ Feedback error:", error);
    res.status(500).json({ ok: false, error: "Failed to process feedback" });
  }
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

app.use((err, req, res, next) => {
  console.error(`❌ [${req.id}] Error:`, err);
  res.status(err.status || 500).json({
    ok: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    requestId: req.id,
    timestamp: new Date().toISOString()
  });
});

// ============================================================================
// SERVER STARTUP & GRACEFUL SHUTDOWN
// ============================================================================

let server;
const gracefulShutdownTimeout = 30000; // 30 seconds

async function startServer() {
  try {
    await initializeDatabase();
    
    server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`\n✅ SkateHubba API running on port ${PORT}`);
      console.log(`🎯 Mode: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📊 Health: http://localhost:${PORT}/api/health`);
      console.log(`✓ Ready: http://localhost:${PORT}/api/ready`);
      console.log(`💚 Live: http://localhost:${PORT}/api/live`);
      console.log(`📚 Docs: http://localhost:${PORT}/api\n`);
    });

    // Graceful shutdown handlers
    const shutdown = async (signal) => {
      console.log(`\n⏱️  ${signal} received - initiating graceful shutdown...`);
      
      server.close(async () => {
        console.log("✅ HTTP server closed");
        
        // Cleanup database connections if needed
        try {
          console.log("🧹 Cleaning up resources...");
          process.exit(0);
        } catch (error) {
          console.error("❌ Cleanup error:", error);
          process.exit(1);
        }
      });

      // Force shutdown after timeout
      setTimeout(() => {
        console.error("❌ Forced shutdown - timeout reached");
        process.exit(1);
      }, gracefulShutdownTimeout);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    // Handle unhandled rejections
    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    });

    process.on('uncaughtException', (error) => {
      console.error('❌ Uncaught Exception:', error);
      process.exit(1);
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

export default app;
