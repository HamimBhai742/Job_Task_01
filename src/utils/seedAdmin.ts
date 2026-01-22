import { ENV } from '../config/env';
import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma.configs';
import { Role } from '../../generated/prisma';
export const seedAdmin = async () => {
  console.log(
    ENV.PLT_ADMIN_PASSWORD_SALT_ROUNDS,
    ENV.PLT_ADMIN_PASSWORD,
    ENV.PLT_ADMIN_EMAIL
  );
  try {
    const email = ENV.PLT_ADMIN_EMAIL;
    const isExsist = await prisma.user.findUnique({
      where: { email },
    });
    if (isExsist) {
      console.log('Admin Already Exsist');
      return;
    }

    const hashedPassword = await bcrypt.hash(
      ENV.PLT_ADMIN_PASSWORD,
      ENV.PLT_ADMIN_PASSWORD_SALT_ROUNDS
    );
    const payload = {
      email,
      password: hashedPassword,
      role: Role.PLATFORM_ADMIN,
    };
    console.log(payload);
    await prisma.user.create({
      data: payload,
    });
  } catch (error) {
    console.log(error);
  }
};
