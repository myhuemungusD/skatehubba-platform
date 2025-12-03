const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const users = {
  get: async (uid: string) => {
    const res = await fetch(`${API_URL}/users/${uid}`);
    return res.json();
  },
  create: async (data: any) => {
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
