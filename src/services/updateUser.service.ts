import AppDataSource from '../data-source';
import { User } from '../entities/user.entity';

export const updateUserService = async (
  data: Partial<User>,
  id: string,
  userLogged: any,
) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: id });
  const userId = user!.id;

  if (!userLogged.isAdm && userLogged.id !== id) {
    return [401, { message: 'Missing admin permissions' }];
  }

  if (
    data.hasOwnProperty('isAdm') ||
    data.hasOwnProperty('id') ||
    data.hasOwnProperty('isActive')
  ) {
    return [401, { message: 'Unable to change fields' }];
  }

  await userRepository.update(userId, {
    ...data,
    updatedAt: new Date(),
  });

  return [200, { message: 'User updated successfully' }];
};
