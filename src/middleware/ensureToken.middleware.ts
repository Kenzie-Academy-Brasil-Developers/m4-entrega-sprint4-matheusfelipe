import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AppDataSource from '../data-source';
import { User } from '../entities/user.entity';

export const ensureTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userRepository = AppDataSource.getRepository(User);
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: 'Missing authorization headers' });
  }

  const token = authToken.split(' ')[1];

  return jwt.verify(token, 'SECRET_KEY', async (error, decoded: any) => {
    if (error) {
      return res.status(401).json({ message: 'Invalid Token' });
    }

    const userLogged = await userRepository.findOneBy({ id: decoded.sub });

    req.user = {
      isAdm: userLogged!.isAdm,
      isActive: userLogged!.isActive,
      id: userLogged!.id,
    };

    return next();
  });
};
