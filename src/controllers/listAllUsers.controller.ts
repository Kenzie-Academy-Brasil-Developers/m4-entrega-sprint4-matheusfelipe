import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { listAllUsersService } from '../services/listAllUsers.service';

export const listAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await listAllUsersService();

    return res.status(200).json(instanceToInstance(users));
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }
};
