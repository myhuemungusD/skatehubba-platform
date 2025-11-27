import {
  type InsertTutorialStep,
  type InsertUserProgress,
  type Subscriber,
  subscribers,
  type TutorialStep,
  tutorialSteps,
  type UpdateUserProgress,
  type UpsertUser,
  type User,
  type UserProgress,
  userProgress,
  users,
} from "@skatehubba/db";
import bcryptjs from "bcryptjs";
import { and, eq } from "drizzle-orm";
import { db } from "./db";
import type { CreateSubscriber } from "./storage/types.ts";

// Export crypto utilities for routes
export const hashPassword = async (password: string): Promise<string> => {
  return bcryptjs.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return bcryptjs.compare(password, hash);
};

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserOnboardingStatus(
    userId: string,
    completed: boolean,
    currentStep?: number,
  ): Promise<User | undefined>;
  getSpot(id: string): Promise<any>;
  getAllTutorialSteps(): Promise<TutorialStep[]>;
  getTutorialStep(id: number): Promise<TutorialStep | undefined>;
  createTutorialStep(step: InsertTutorialStep): Promise<TutorialStep>;
  getUserProgress(userId: string): Promise<UserProgress[]>;
  getUserStepProgress(
    userId: string,
    stepId: number,
  ): Promise<UserProgress | undefined>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  updateUserProgress(
    userId: string,
    stepId: number,
    updates: UpdateUserProgress,
  ): Promise<UserProgress | undefined>;
  createSubscriber(data: CreateSubscriber): Promise<Subscriber>;
  getSubscribers(): Promise<Subscriber[]>;
  getSubscriber(email: string): Promise<Subscriber | undefined>;
  createDonation(donation: {
    firstName: string;
    amount: number;
    paymentIntentId: string;
    status: string;
  }): Promise<any>;
  updateDonationStatus(paymentIntentId: string, status: string): Promise<any>;
  getRecentDonors(
    limit?: number,
  ): Promise<{ firstName: string; createdAt: Date }[]>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    this.initializeDefaultTutorialSteps();
  }

  private async initializeDefaultTutorialSteps() {
    try {
      const testQuery = await db.select().from(tutorialSteps).limit(1);
      if (testQuery.length > 0) {
        console.log("✅ Tutorial steps already initialized");
        return;
      }

      console.log("📚 Initializing default tutorial steps...");

      const defaultSteps: InsertTutorialStep[] = [
        {
          title: "Welcome to SkateHubba",
          description: "Learn the basics of navigating the skate community",
          type: "intro",
          content: { videoUrl: "https://example.com/intro-video" },
          order: 1,
        },
        {
          title: "Interactive Elements",
          description: "Try tapping, swiping, and dragging elements",
          type: "interactive",
          content: {
            interactiveElements: [
              {
                type: "tap",
                target: "skate-board",
                instruction: "Tap the skateboard to pick it up",
              },
              {
                type: "swipe",
                target: "trick-menu",
                instruction: "Swipe to browse tricks",
              },
            ],
          },
          order: 2,
        },
        {
          title: "Community Challenge",
          description: "Complete your first community challenge",
          type: "challenge",
          content: {
            challengeData: {
              action: "post_trick",
              expectedResult: "Share a trick with the community",
            },
          },
          order: 3,
        },
      ];

      for (const step of defaultSteps) {
        await this.createTutorialStep(step);
      }

      console.log("✅ Successfully initialized tutorial steps");
    } catch (error) {
      console.error("❌ Database initialization failed:", error);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(user: UpsertUser): Promise<User> {
    const [result] = await db
      .insert(users)
      .values(user)
      .onConflictDoUpdate({
        target: users.id,
        set: user,
      })
      .returning();
    return result;
  }

  async updateUserOnboardingStatus(
    userId: string,
    completed: boolean,
    currentStep?: number,
  ): Promise<User | undefined> {
    const [result] = await db
      .update(users)
      .set({ onboardingCompleted: completed, currentStep })
      .where(eq(users.id, userId))
      .returning();
    return result;
  }

  async getSpot(_id: string): Promise<any> {
    // Spots table not yet implemented - return placeholder
    return null;
  }

  async getAllTutorialSteps(): Promise<TutorialStep[]> {
    return db.select().from(tutorialSteps);
  }

  async getTutorialStep(id: number): Promise<TutorialStep | undefined> {
    const [step] = await db
      .select()
      .from(tutorialSteps)
      .where(eq(tutorialSteps.id, id));
    return step;
  }

  async createTutorialStep(step: InsertTutorialStep): Promise<TutorialStep> {
    const [result] = await db.insert(tutorialSteps).values(step).returning();
    return result;
  }

  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId));
  }

  async getUserStepProgress(
    userId: string,
    stepId: number,
  ): Promise<UserProgress | undefined> {
    const [progress] = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, userId),
          eq(userProgress.tutorialStepId, stepId),
        ),
      );
    return progress;
  }

  async createUserProgress(
    progress: InsertUserProgress,
  ): Promise<UserProgress> {
    const [result] = await db.insert(userProgress).values(progress).returning();
    return result;
  }

  async updateUserProgress(
    userId: string,
    stepId: number,
    updates: UpdateUserProgress,
  ): Promise<UserProgress | undefined> {
    const [result] = await db
      .update(userProgress)
      .set(updates)
      .where(
        and(
          eq(userProgress.userId, userId),
          eq(userProgress.tutorialStepId, stepId),
        ),
      )
      .returning();
    return result;
  }

  async createSubscriber(data: CreateSubscriber): Promise<Subscriber> {
    const [result] = await db.insert(subscribers).values(data).returning();
    return result;
  }

  async getSubscribers(): Promise<Subscriber[]> {
    return db.select().from(subscribers);
  }

  async getSubscriber(email: string): Promise<Subscriber | undefined> {
    const [subscriber] = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email));
    return subscriber;
  }

  async createDonation(_donation: any): Promise<any> {
    return null; // Donations table not implemented yet
  }

  async updateDonationStatus(
    _paymentIntentId: string,
    _status: string,
  ): Promise<any> {
    return null;
  }

  async getRecentDonors(
    _limit: number = 5,
  ): Promise<{ firstName: string; createdAt: Date }[]> {
    return [];
  }
}

export const storage = new DatabaseStorage();
