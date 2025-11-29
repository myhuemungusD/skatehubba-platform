import express, { Router, Response } from 'express';
import { createCanvas, GlobalFonts, SKRSContext2D } from '@napi-rs/canvas';
import QRCode from 'qrcode';
import { collections } from '@skatehubba/db';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';

export const stickerRouter: Router = express.Router();

const STICKER_SIZE = 1200;
const DPI = 300;

async function generateQRCodeDataURL(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    width: 400,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
  });
}

function wrapText(
  ctx: SKRSContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
  return currentY;
}

async function generateSticker(
  userName: string,
  handle: string
): Promise<Buffer> {
  const canvas = createCanvas(STICKER_SIZE, STICKER_SIZE);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, STICKER_SIZE, STICKER_SIZE);

  const gradient = ctx.createLinearGradient(0, 0, STICKER_SIZE, STICKER_SIZE);
  gradient.addColorStop(0, '#F0F4F8');
  gradient.addColorStop(1, '#D9E2EC');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, STICKER_SIZE, STICKER_SIZE);

  ctx.strokeStyle = '#334E68';
  ctx.lineWidth = 8;
  ctx.strokeRect(40, 40, STICKER_SIZE - 80, STICKER_SIZE - 80);

  ctx.fillStyle = '#102A43';
  ctx.font = 'bold 96px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SKATEHUBBA', STICKER_SIZE / 2, 180);

  ctx.strokeStyle = '#FF6B6B';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(200, 220);
  ctx.lineTo(STICKER_SIZE - 200, 220);
  ctx.stroke();

  const displayName = userName || handle;
  ctx.fillStyle = '#102A43';
  ctx.font = 'bold 72px sans-serif';
  ctx.textAlign = 'center';
  
  const nameMetrics = ctx.measureText(displayName);
  if (nameMetrics.width > STICKER_SIZE - 200) {
    wrapText(ctx, displayName, STICKER_SIZE / 2, 330, STICKER_SIZE - 200, 80);
  } else {
    ctx.fillText(displayName, STICKER_SIZE / 2, 330);
  }

  ctx.fillStyle = '#627D98';
  ctx.font = '48px sans-serif';
  ctx.fillText(`@${handle}`, STICKER_SIZE / 2, 420);

  const profileUrl = `https://skatehubba.com/@${handle}`;
  const qrDataURL = await generateQRCodeDataURL(profileUrl);
  
  const qrImage = await fetch(qrDataURL);
  const qrBuffer = await qrImage.arrayBuffer();
  const qrImg = await canvas.loadImage(Buffer.from(qrBuffer));

  const qrSize = 400;
  const qrX = (STICKER_SIZE - qrSize) / 2;
  const qrY = 500;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(qrX - 20, qrY - 20, qrSize + 40, qrSize + 40);
  
  ctx.strokeStyle = '#334E68';
  ctx.lineWidth = 4;
  ctx.strokeRect(qrX - 20, qrY - 20, qrSize + 40, qrSize + 40);

  ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

  ctx.fillStyle = '#627D98';
  ctx.font = '32px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Scan to view profile', STICKER_SIZE / 2, 980);

  ctx.fillStyle = '#9FB3C8';
  ctx.font = '28px sans-serif';
  ctx.fillText('skatehubba.com', STICKER_SIZE / 2, 1080);

  return canvas.toBuffer('image/png');
}

stickerRouter.get('/:userId', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }

    const userDoc = await collections.users().doc(userId).get();

    if (!userDoc.exists) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const userData = userDoc.data();
    if (!userData) {
      res.status(404).json({ error: 'User data not found' });
      return;
    }

    const userName = userData.handle || 'Skater';
    const handle = userData.handle || userId;

    console.log(`Generating sticker for user: ${userName} (@${handle})`);

    const stickerBuffer = await generateSticker(userName, handle);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `inline; filename="skatehubba-${handle}-sticker.png"`);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(stickerBuffer);
  } catch (error) {
    console.error('Error generating sticker:', error);
    res.status(500).json({ 
      error: 'Failed to generate sticker',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});
