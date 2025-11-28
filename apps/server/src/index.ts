import express from 'express';
import cors from 'cors';
import { router as api } from './lib/api';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', api);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`SkateHubba API live on :${port}`);
  console.log(`Heshur's watching.`);
});
