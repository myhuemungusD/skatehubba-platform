import { Router, Request, Response, NextFunction } from "express";
import { admin } from "../admin";
import { db } from "../db";
import { users } from "@skatehubba/db/schema";
import { eq } from "drizzle-orm";

const router = Router();

interface AuthRequest extends Request {
  user?: {
    uid: string;
    email?: string;
    name?: string;
    picture?: string;
  };
}

async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
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
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

router.get("/profile", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { uid, email, name, picture } = req.user!;

    const existingUsers = await db.select().from(users).where(eq(users.id, uid));
    let user = existingUsers[0];

    if (!user) {
      if (!email) {
        return res.status(400).json({ error: "Email is required to create a profile" });
      }
      
      const [newUser] = await db
        .insert(users)
        .values({
          id: uid,
          email: email,
          displayName: name ?? email.split("@")[0] ?? "Skater",
          photoURL: picture ?? null,
        })
        .returning();
      
      user = newUser;
      console.log(`✨ Auto-created profile for new user: ${uid} (${email})`);
    }

    return res.json({ user });
  } catch (error) {
    console.error("❌ Profile fetch error:", error);
    return res.status(500).json({ error: "Failed to fetch profile" });
  }
});

export default router;
