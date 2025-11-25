import { Response, NextFunction, Request } from "express";
import { admin } from "../admin";
import { DecodedIdToken } from "firebase-admin/auth";

// --- Custom Request Interface ---
// Use generic Request<...> to extend the Express Request object safely.
export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email?: string;
    name?: string;
    picture?: string;
  };
}

// --- Cached Admin List (Optimization) ---
// Rationale: Read the environment variable only once when the server starts.
const ADMIN_UIDS: Set<string> = new Set(
  (process.env.ADMIN_UIDS || "").split(",").filter(Boolean)
);

// --- Core Verification Logic (DRY Principle) ---
/**
 * Extracts and verifies the Firebase ID Token from the Authorization header.
 */
async function verifyToken(req: AuthRequest, res: Response): Promise<DecodedIdToken | null> {
  const authHeader = req.headers.authorization;
  
  // 1. Check for token presence
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "No token provided", requestId: req.id });
    return null;
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    // 2. Verify token validity (signature, expiry)
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // 3. Attach user data to the request object
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture,
    };
    
    return decodedToken;
  } catch (error) {
    // Log the actual error for debugging, but return a generic 401 to the client
    console.error("Firebase ID Token verification failed:", error); 
    res.status(401).json({ error: "Invalid or expired token", requestId: req.id });
    return null;
  }
}

// --- Public Authentication Middleware ---
export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const decoded = await verifyToken(req, res);
  if (decoded) {
    // Token is valid and req.user is set
    next();
  }
}

// --- Admin Authorization Middleware ---
export async function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  const decoded = await verifyToken(req, res);
  
  if (!decoded) {
    // Verification already failed and response sent (401)
    return;
  }
  
  // Check against the cached list (O(1) lookup using Set)
  if (!ADMIN_UIDS.has(decoded.uid)) {
    return res.status(403).json({ 
      error: "Admin access required",
      requestId: req.id
    });
  }

  // Token is valid and user is in the ADMIN_UIDS list
  next();
}
