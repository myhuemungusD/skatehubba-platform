const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const leaderboard = {
  get: async () => {
    const res = await fetch(`${API_URL}/leaderboard`);
    return res.json();
  },
};
