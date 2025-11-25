import { Response, NextFunction, Request } from "express";
import { admin } from "../admin";

// Cache Admin UIDs once at startup
const ADMIN_UIDS = (process.env.ADMIN_UIDS || "").split(",").filter(Boolean);

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email?: string;
    name?: string;
    picture?: string;
  };
  id?: string; // For request ID tracing
}

// Helper to extract and verify token
async function verifyToken(req: AuthRequest) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  const idToken = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture,
    };
  } catch (error) {
    return null;
  }
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const user = await verifyToken(req);
  
  if (!user) {
    return res.status(401).json({ 
      error: "Invalid or missing token",
      requestId: req.id
    });
  }

  req.user = user;
  next();
}

export async function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  const user = await verifyToken(req);

  if (!user) {
    return res.status(401).json({ 
      error: "Invalid or missing token",
      requestId: req.id
    });
  }

  if (!ADMIN_UIDS.includes(user.uid)) {
    return res.status(403).json({ 
      error: "Admin access required",
      requestId: req.id
    });
  }

  req.user = user;
  next();
}
