import { Response, NextFunction } from "express";
import { admin } from "../admin";

export interface AuthRequest extends Express.Request {
  user?: {
    uid: string;
    email?: string;
    name?: string;
    picture?: string;
  };
}

export async function requireAuth(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ 
      error: "No token provided",
      requestId: req.id
    });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture,
    };
    next();
  } catch (error) {
    return res.status(401).json({ 
      error: "Invalid or expired token",
      requestId: req.id
    });
  }
}

export async function requireAdmin(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ 
      error: "No token provided",
      requestId: req.id
    });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const adminUids = (process.env.ADMIN_UIDS || "").split(",").filter(Boolean);
    
    if (!adminUids.includes(decodedToken.uid)) {
      return res.status(403).json({ 
        error: "Admin access required",
        requestId: req.id
      });
    }

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture,
    };
    next();
  } catch (error) {
    return res.status(401).json({ 
      error: "Invalid or expired token",
      requestId: req.id
    });
  }
}
