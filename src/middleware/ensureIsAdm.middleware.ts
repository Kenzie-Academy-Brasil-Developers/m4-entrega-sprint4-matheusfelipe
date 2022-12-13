import { Request, Response, NextFunction } from 'express';

export const ensureIsAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user.isAdm) {
    return res.status(403).json({
      message: 'Missing admin permissions',
    });
  }

  return next();
};
