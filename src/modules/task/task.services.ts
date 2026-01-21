import { Role } from '../../../generated/prisma';
import { prisma } from '../../config/prisma.configs';
import { AppError } from '../../error/coustom.error';
import httpStatusCode from 'http-status-codes';

const assignedTasks = async (
  payload: any,
  projectId: string,
  assignedToId: string,
  userId: string
) => {
  const ogAdmin = await prisma.user.findUnique({
    where: { id: userId, role: Role.OG_ADMIN },
  });
  const assignedMember = await prisma.user.findUnique({
    where: { id: assignedToId, role: Role.OG_MEMBER },
  });

  if (ogAdmin?.organizationId !== assignedMember?.organizationId) {
    throw new AppError(
      'You are not authorized to assign a task to this member',
      httpStatusCode.UNAUTHORIZED
    );
  }
  
  const task = await prisma.task.create({
    data: {
      ...payload,
      projectId,
      assignedToId,
    },
  });
  return task;
};
