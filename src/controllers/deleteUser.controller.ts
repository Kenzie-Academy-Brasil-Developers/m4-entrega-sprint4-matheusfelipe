import { Request, Response } from 'express';
import { deleteUserService } from '../services/deleteUser.service';

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [status] = await deleteUserService(id);

    return res.sendStatus(status);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err.message });
    }
  }
};
