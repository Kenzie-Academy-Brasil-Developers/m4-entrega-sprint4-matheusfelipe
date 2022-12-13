import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import { updateUserService } from '../services/updateUser.service';

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const userLogged = req.user;
    const { id } = req.params;

    const [status, userUpdated] = await updateUserService(data, id, userLogged);

    return res.status(status as number).json(instanceToInstance(userUpdated));
  } catch (err) {
    if (err instanceof Error) {
      return res.status(404).json({ error: err.message });
    }
  }
};
