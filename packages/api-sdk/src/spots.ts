const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const spots = {
  list: async () => {
    const res = await fetch(`${API_URL}/spots`);
    return res.json();
  },
  create: async (data: any) => {
    const res = await fetch(`${API_URL}/spots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
