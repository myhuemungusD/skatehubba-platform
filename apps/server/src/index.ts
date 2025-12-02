import express from 'express';
import cors from 'cors';
import { usersRouter } from './routes/users';
import { spotsRouter } from './routes/spots';
import { challengesRouter } from './routes/challenges';
import { leaderboardRouter } from './routes/leaderboard';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/spots', spotsRouter);
app.use('/challenges', challengesRouter);
app.use('/leaderboard', leaderboardRouter);

app.get('/', (req, res) => {
  res.send('SkateHubba API Server');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
