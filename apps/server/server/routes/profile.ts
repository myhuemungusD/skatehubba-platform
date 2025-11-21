import { Router, Response } from "express";
import { db } from "../db";
import { users } from "@skatehubba/db";
import { eq } from "drizzle-orm";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

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
