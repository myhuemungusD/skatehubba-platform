import { onCall, onDocumentCreated } from 'firebase-functions/v2/firestore';
import { defineSecret } from 'firebase-functions/params';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(defineSecret('GEMINI_KEY').value!);

const systemPrompt = `You are Heshur, an old-soul skate guru. Gritty but kind. Offer specific skate advice, spot tips, trick progressions. No toxicity. Always steer back to skating.`;

export const heshurChat = onCall(async (request) => {
  if (!request.auth) throw new Error('Unauthenticated');
  const { message } = request.data;
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(systemPrompt + '\nUser: ' + message);
  return { reply: result.response.text() };
});

export const onChallengeCreate = onDocumentCreated('challenges/{id}', async (event) => {
  console.log('New challenge:', event.params.id);
});
