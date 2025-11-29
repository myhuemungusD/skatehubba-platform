import { Request, Response, NextFunction } from 'express';
import { admin } from '../lib/firebase';

export interface AuthenticatedUser {
  uid: string;
  email?: string;
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Missing or invalid authorization header' });
      return;
    }

    const token = authHeader.substring(7);

    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const decodedToken = await admin.auth().verifyIdToken(token);

    (req as AuthenticatedRequest).user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('expired')) {
        res.status(401).json({ error: 'Token expired' });
        return;
      }
      if (error.message.includes('invalid')) {
        res.status(401).json({ error: 'Invalid token' });
        return;
      }
    }
    
    res.status(401).json({ error: 'Authentication failed' });
  }
};

export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);

      if (token) {
        const decodedToken = await admin.auth().verifyIdToken(token);

        (req as AuthenticatedRequest).user = {
          uid: decodedToken.uid,
          email: decodedToken.email,
        };
      }
    }

    next();
  } catch (error) {
    console.error('Optional auth error (continuing without auth):', error);
    next();
  }
};
