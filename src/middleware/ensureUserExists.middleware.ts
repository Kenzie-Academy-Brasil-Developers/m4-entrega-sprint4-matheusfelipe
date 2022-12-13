import { Request, Response, NextFunction } from 'express';
import AppDataSource from '../data-source';
import { User } from '../entities/user.entity';

export const ensureUserExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;

  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.findOneBy({ email: email });

  if (!users) {
    res.status(401).json({ message: 'Invalid user or password' });
  }

  return next();
};
