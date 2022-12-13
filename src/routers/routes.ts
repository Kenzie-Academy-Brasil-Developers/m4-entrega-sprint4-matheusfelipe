import { Router } from 'express';
import { createUserController } from '../controllers/createUser.controller';
import { deleteUserController } from '../controllers/deleteUser.controller';
import { listAllUsersController } from '../controllers/listAllUsers.controller';
import { loginUserController } from '../controllers/loginUser.controller';
import { updateUserController } from '../controllers/updateUser.controller';
import { ensureEmailMiddleware } from '../middleware/ensureEmail.middleware';
import { ensureIsActiveMiddleware } from '../middleware/ensureIsActive.middleware';
import { ensureIsAdmMiddleware } from '../middleware/ensureIsAdm.middleware';
import { ensureTokenMiddleware } from '../middleware/ensureToken.middleware';
import { ensureUserExistsMiddleware } from '../middleware/ensureUserExists.middleware';

export const router = Router();

router.post('/users', ensureEmailMiddleware, createUserController);

router.get(
  '/users',
  ensureTokenMiddleware,
  ensureIsAdmMiddleware,
  listAllUsersController,
);

router.patch(
  '/users/:id',
  ensureTokenMiddleware,
  ensureIsActiveMiddleware,
  updateUserController,
);

router.delete(
  '/users/:id',
  ensureTokenMiddleware,
  ensureIsAdmMiddleware,
  ensureIsActiveMiddleware,
  deleteUserController,
);

router.post('/login', ensureUserExistsMiddleware, loginUserController);
