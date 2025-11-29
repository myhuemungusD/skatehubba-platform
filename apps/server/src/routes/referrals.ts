import express, { Router, Response } from 'express';
import { randomBytes } from 'crypto';
import { collections } from '@skatehubba/db';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';
import { FieldValue } from '@google-cloud/firestore';

export const referralsRouter: Router = express.Router();

function generateReferralCode(): string {
  return randomBytes(4).toString('hex').toUpperCase();
}

referralsRouter.post('/invite', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { referredEmail } = req.body;
    const referrerId = req.user.uid;

    if (!referredEmail || typeof referredEmail !== 'string') {
      res.status(400).json({ error: 'referredEmail is required' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(referredEmail)) {
      res.status(400).json({ error: 'Invalid email format' });
      return;
    }

    const existingReferrals = await collections.referrals()
      .where('referrerId', '==', referrerId)
      .where('referredEmail', '==', referredEmail)
      .get();

    if (!existingReferrals.empty) {
      res.status(400).json({ error: 'You have already invited this email' });
      return;
    }

    const referralId = randomBytes(16).toString('hex');
    const referralDoc = {
      id: referralId,
      referrerId,
      referredEmail,
      referredUserId: null,
      createdAt: FieldValue.serverTimestamp(),
      completed: false,
    };

    await collections.referrals().doc(referralId).set(referralDoc);

    res.status(201).json({
      message: 'Referral invite created successfully',
      referralId,
      referredEmail,
    });
  } catch (error) {
    console.error('Error creating referral invite:', error);
    res.status(500).json({ error: 'Failed to create referral invite' });
  }
});

referralsRouter.get('/:userId', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userId } = req.params;

    if (req.user.uid !== userId) {
      res.status(403).json({ error: 'Forbidden: You can only view your own referral stats' });
      return;
    }

    const referralsSnapshot = await collections.referrals()
      .where('referrerId', '==', userId)
      .get();

    const totalInvites = referralsSnapshot.size;
    const completedInvites = referralsSnapshot.docs.filter(doc => doc.data().completed).length;
    const pendingInvites = totalInvites - completedInvites;

    const referrals = referralsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: data.id,
        referredEmail: data.referredEmail,
        referredUserId: data.referredUserId,
        completed: data.completed,
        createdAt: data.createdAt,
      };
    });

    const userBadgesSnapshot = await collections.userBadges()
      .where('userId', '==', userId)
      .where('badgeId', '==', 'free_deck')
      .get();

    const hasFreeDeckBadge = !userBadgesSnapshot.empty;

    res.json({
      userId,
      totalInvites,
      completedInvites,
      pendingInvites,
      hasFreeDeckBadge,
      referrals,
    });
  } catch (error) {
    console.error('Error fetching referral stats:', error);
    res.status(500).json({ error: 'Failed to fetch referral stats' });
  }
});

referralsRouter.post('/complete', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { referralCode } = req.body;
    const newUserId = req.user.uid;

    if (!referralCode || typeof referralCode !== 'string') {
      res.status(400).json({ error: 'referralCode is required' });
      return;
    }

    const userDoc = await collections.users().doc(newUserId).get();
    if (!userDoc.exists) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const userData = userDoc.data();
    if (userData?.referredBy) {
      res.status(400).json({ error: 'User has already been referred' });
      return;
    }

    const referrerSnapshot = await collections.users()
      .where('referralCode', '==', referralCode)
      .limit(1)
      .get();

    if (referrerSnapshot.empty) {
      res.status(404).json({ error: 'Invalid referral code' });
      return;
    }

    const referrerDoc = referrerSnapshot.docs[0];
    const referrerId = referrerDoc.id;

    if (referrerId === newUserId) {
      res.status(400).json({ error: 'You cannot refer yourself' });
      return;
    }

    const userEmail = req.user.email;
    if (!userEmail) {
      res.status(400).json({ error: 'User email is required for referral completion' });
      return;
    }

    const referralSnapshot = await collections.referrals()
      .where('referrerId', '==', referrerId)
      .where('referredEmail', '==', userEmail)
      .limit(1)
      .get();

    if (referralSnapshot.empty) {
      res.status(404).json({ error: 'No matching referral invitation found for this email' });
      return;
    }

    const referralDoc = referralSnapshot.docs[0];
    const referralData = referralDoc.data();

    if (referralData.completed) {
      res.status(400).json({ error: 'This referral has already been completed' });
      return;
    }

    await referralDoc.ref.update({
      referredUserId: newUserId,
      completed: true,
    });

    await collections.users().doc(newUserId).update({
      referredBy: referrerId,
    });

    const allReferralsSnapshot = await collections.referrals()
      .where('referrerId', '==', referrerId)
      .where('completed', '==', true)
      .get();

    const completedCount = allReferralsSnapshot.size;

    if (completedCount >= 3) {
      const existingBadgeSnapshot = await collections.userBadges()
        .where('userId', '==', referrerId)
        .where('badgeId', '==', 'free_deck')
        .get();

      if (existingBadgeSnapshot.empty) {
        const badgeSnapshot = await collections.badges().doc('free_deck').get();
        
        if (!badgeSnapshot.exists) {
          await collections.badges().doc('free_deck').set({
            id: 'free_deck',
            name: 'Free Deck',
            description: 'Awarded for successfully referring 3 friends',
            rarity: 'rare',
            requirement: 'Refer 3 friends who complete signup',
            createdAt: FieldValue.serverTimestamp(),
          });
        }

        const userBadgeId = `${referrerId}_free_deck`;
        await collections.userBadges().doc(userBadgeId).set({
          userId: referrerId,
          badgeId: 'free_deck',
          earnedAt: FieldValue.serverTimestamp(),
          displayed: true,
        });

        res.json({
          message: 'Referral completed successfully',
          referrerId,
          completedCount,
          badgeAwarded: true,
          badge: 'free_deck',
        });
        return;
      }
    }

    res.json({
      message: 'Referral completed successfully',
      referrerId,
      completedCount,
      badgeAwarded: false,
    });
  } catch (error) {
    console.error('Error completing referral:', error);
    res.status(500).json({ error: 'Failed to complete referral' });
  }
});

referralsRouter.post('/generate-code', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.uid;

    const userDoc = await collections.users().doc(userId).get();
    if (!userDoc.exists) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const userData = userDoc.data();
    if (userData?.referralCode) {
      res.json({
        message: 'Referral code already exists',
        referralCode: userData.referralCode,
      });
      return;
    }

    let referralCode: string;
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 10) {
      referralCode = generateReferralCode();
      const existingCode = await collections.users()
        .where('referralCode', '==', referralCode)
        .limit(1)
        .get();
      
      if (existingCode.empty) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      res.status(500).json({ error: 'Failed to generate unique referral code' });
      return;
    }

    await collections.users().doc(userId).update({
      referralCode: referralCode!,
    });

    res.json({
      message: 'Referral code generated successfully',
      referralCode: referralCode!,
    });
  } catch (error) {
    console.error('Error generating referral code:', error);
    res.status(500).json({ error: 'Failed to generate referral code' });
  }
});
