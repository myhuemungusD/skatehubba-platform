import * as admin from 'firebase-admin';
import { Firestore } from '@google-cloud/firestore';
import type {
  User,
  Challenge,
  Spot,
  CheckIn,
  Wallet,
  ClosetItem,
  SkateGame,
  Quest,
  Session,
  Referral,
  Badge,
  UserBadge,
} from './types';

let firestore: Firestore | null = null;

export function initializeFirestore(): Firestore {
  if (firestore) {
    return firestore;
  }

  if (admin.apps.length === 0) {
    const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (privateKey) {
      privateKey = privateKey.trim();
      privateKey = privateKey.replace(/\\n/g, '\n');
      privateKey = privateKey.replace(/^\n+/, '');

      if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
        privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----\n`;
      }
    }

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error(
        'Missing Firebase credentials. Ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set.'
      );
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }

  firestore = admin.firestore();
  return firestore;
}

export function getFirestore(): Firestore {
  if (!firestore) {
    return initializeFirestore();
  }
  return firestore;
}

export const collections = {
  users: () => getFirestore().collection('users') as FirebaseFirestore.CollectionReference<User>,
  challenges: () => getFirestore().collection('challenges') as FirebaseFirestore.CollectionReference<Challenge>,
  spots: () => getFirestore().collection('spots') as FirebaseFirestore.CollectionReference<Spot>,
  checkins: () => getFirestore().collection('checkins') as FirebaseFirestore.CollectionReference<CheckIn>,
  wallets: () => getFirestore().collection('wallets') as FirebaseFirestore.CollectionReference<Wallet>,
  skateGames: () => getFirestore().collection('skate_games') as FirebaseFirestore.CollectionReference<SkateGame>,
  quests: () => getFirestore().collection('quests') as FirebaseFirestore.CollectionReference<Quest>,
  sessions: () => getFirestore().collection('sessions') as FirebaseFirestore.CollectionReference<Session>,
  referrals: () => getFirestore().collection('referrals') as FirebaseFirestore.CollectionReference<Referral>,
  badges: () => getFirestore().collection('badges') as FirebaseFirestore.CollectionReference<Badge>,
  userBadges: () => getFirestore().collection('user_badges') as FirebaseFirestore.CollectionReference<UserBadge>,
  
  closetItems: (userId: string) =>
    getFirestore()
      .collection('closet')
      .doc(userId)
      .collection('items') as FirebaseFirestore.CollectionReference<ClosetItem>,
};

export { admin, Firestore };
