import * as admin from 'firebase-admin';

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY;

// Handle private key formatting
if (privateKey) {
  // Remove any leading/trailing whitespace and literal \n characters
  privateKey = privateKey.trim();
  
  // Replace literal '\n' string with actual newlines
  privateKey = privateKey.replace(/\\n/g, '\n');
  
  // Remove any leading newline that might remain
  privateKey = privateKey.replace(/^\n+/, '');
  
  // Ensure proper PEM format with BEGIN/END markers
  if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
    privateKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----\n`;
  }
}

if (!projectId || !clientEmail || !privateKey) {
  throw new Error(
    'Missing Firebase credentials. Ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set.'
  );
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

export const db = admin.firestore();
export { admin };
