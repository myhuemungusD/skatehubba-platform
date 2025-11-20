import admin from "firebase-admin";
import { env } from './config/env';

if (!admin.apps.length) {
  try {
    const hasKey = !!env.FIREBASE_ADMIN_KEY;
    console.log(`🔑 FIREBASE_ADMIN_KEY present: ${hasKey}, length: ${env.FIREBASE_ADMIN_KEY?.length || 0}`);
    
    if (!hasKey) {
      throw new Error('FIREBASE_ADMIN_KEY is missing! Cannot initialize Firebase Admin SDK.');
    }
    
    const serviceAccount = JSON.parse(env.FIREBASE_ADMIN_KEY!);
    console.log(`📋 Service Account project_id: ${serviceAccount.project_id}`);
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: env.VITE_FIREBASE_PROJECT_ID || serviceAccount.project_id,
    });
    console.log('✅ Firebase Admin SDK initialized successfully');
  } catch (error) {
    console.error('❌ Firebase Admin initialization failed:', error);
    throw error;
  }
}

export { admin };
