import { Request, Response, NextFunction } from 'express';
import AppDataSource from '../data-source';
import { User } from '../entities/user.entity';

export const ensureEmailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;

  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const emailExists = users.find((user) => user.email === email);

  if (emailExists) {
    return res.status(400).json({
      message: 'Email already exists',
    });
  }

  return next();
};
