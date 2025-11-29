import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const ClipUrlSchema = z.object({
  clipUrl: z.string().min(1, 'Clip URL is required').url('Invalid URL format'),
});

export const SessionStatusSchema = z.object({
  status: z.enum(['COMPLETED', 'FAILED'], {
    errorMap: () => ({ message: 'Status must be either COMPLETED or FAILED' }),
  }),
});

export const NearbyQuestsSchema = z.object({
  lat: z.number().min(-90).max(90, 'Latitude must be between -90 and 90'),
  lng: z.number().min(-180).max(180, 'Longitude must be between -180 and 180'),
  radiusKm: z.number().positive().optional().default(5),
});

export const CreateSessionSchema = z.object({
  questId: z.string().min(1, 'Quest ID is required'),
});

export const validateRequest = <T>(schema: z.ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: 'Validation failed',
          details: error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
          })),
        });
        return;
      }
      res.status(400).json({ error: 'Invalid request data' });
    }
  };
};
