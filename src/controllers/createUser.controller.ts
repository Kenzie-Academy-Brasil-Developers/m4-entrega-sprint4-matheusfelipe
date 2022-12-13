import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { createUserService } from '../services/createUser.service';

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, isAdm } = req.body;
    const newUser = await createUserService({ name, email, password, isAdm });

    return res.status(201).json(instanceToInstance(newUser));
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }
};
