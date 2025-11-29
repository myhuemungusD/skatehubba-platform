import express from 'express';
import cors from 'cors';
import { router as api } from './lib/api';
import { initializeQuests } from './lib/quests';
import { initializeFirestore } from '@skatehubba/db';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', api);

const port = process.env.PORT || 8080;

async function startServer() {
  try {
    console.log('Initializing Firebase Admin SDK...');
    initializeFirestore();
    console.log('Firebase Admin SDK initialized successfully');
  } catch (error) {
    console.error('CRITICAL: Failed to initialize Firebase Admin SDK');
    console.error('Please ensure the following environment variables are set:');
    console.error('  - FIREBASE_PROJECT_ID');
    console.error('  - FIREBASE_CLIENT_EMAIL');
    console.error('  - FIREBASE_PRIVATE_KEY');
    console.error('Error details:', error instanceof Error ? error.message : error);
    
    if (process.env.NODE_ENV === 'production') {
      console.error('Production environment requires Firebase credentials. Exiting.');
      process.exit(1);
    } else {
      console.warn('WARNING: Running in development mode without Firebase credentials.');
      console.warn('Some features requiring Firebase will not work.');
    }
  }

  try {
    console.log('Initializing quest data...');
    await initializeQuests();
    console.log('Quest data initialized successfully');
  } catch (error) {
    console.warn('Quest initialization completed with warnings (see above)');
  }

  app.listen(port, () => {
    console.log(`SkateHubba API live on :${port}`);
    console.log(`Heshur's watching.`);
  });
}

startServer();
