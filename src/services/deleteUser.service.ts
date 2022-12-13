import AppDataSource from '../data-source';
import { User } from '../entities/user.entity';

export const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: id });

  if (!user?.isActive) {
    throw new Error('User not found');
  }

  await userRepository.update(id, { isActive: false });

  return [204];
};
