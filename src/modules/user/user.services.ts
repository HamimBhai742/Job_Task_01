import { Role } from '../../../generated/prisma';
import { ENV } from '../../config/env';
import { prisma } from '../../config/prisma.configs';
import bcrypt from 'bcryptjs';
import { AppError } from '../../error/coustom.error';
import httpStatuscode from 'http-status-codes';
const createOrgAdmin = async (
  email: string,
  password: string,
  organizationId: string
) => {
  const hashedPassword = await bcrypt.hash(
    password,
    ENV.PLT_ADMIN_PASSWORD_SALT_ROUNDS
  );
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: Role.OG_ADMIN,
      organizationId,
    },
  });
  return user;
};

const createOrgMember = async (
  orgadminId: string,
  email: string,
  password: string,
  organizationId: string
) => {
  const orgAdmin = await prisma.user.findUnique({
    where: { id: orgadminId },
  });

  if (orgAdmin?.organizationId !== organizationId) {
    throw new AppError(
      'You are not authorized to create a member for this organization',
      httpStatuscode.UNAUTHORIZED
    );
  }

  const hashedPassword = await bcrypt.hash(
    password,
    ENV.PLT_ADMIN_PASSWORD_SALT_ROUNDS
  );
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: Role.OG_MEMBER,
      organizationId,
    },
  });
  return user;
};

export const userService = {
  createOrgAdmin,
  createOrgMember,
};
