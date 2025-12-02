const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const challenges = {
  get: async (id: string) => {
    const res = await fetch(`${API_URL}/challenges/${id}`);
    return res.json();
  },
  create: async (data: any) => {
    const res = await fetch(`${API_URL}/challenges`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
