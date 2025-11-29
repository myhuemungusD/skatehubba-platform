import express from 'express';
import cors from 'cors';
import { router as api } from './lib/api';
import { initializeQuests } from './lib/quests';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', api);

const port = process.env.PORT || 8080;

async function startServer() {
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
