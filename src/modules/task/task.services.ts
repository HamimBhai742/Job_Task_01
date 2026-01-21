import { Role } from '../../../generated/prisma';
import { prisma } from '../../config/prisma.configs';
import { AppError } from '../../error/coustom.error';
import httpStatusCode from 'http-status-codes';

const assignedTasks = async (payload: any, userId: string) => {
  const ogAdmin = await prisma.user.findUnique({
    where: { id: userId, role: Role.OG_ADMIN },
  });

  const assignedMember = await prisma.user.findUnique({
    where: { id: payload.assignedToId, role: Role.OG_MEMBER },
  });

  const project = await prisma.project.findUnique({
    where: { id: payload.projectId },
  });

  if (project?.organizationId !== ogAdmin?.organizationId) {
    throw new AppError(
      'You are not authorized to assign a task to this project',
      httpStatusCode.UNAUTHORIZED
    );
  }

  if (ogAdmin?.organizationId !== assignedMember?.organizationId) {
    throw new AppError(
      'You are not authorized to assign a task to this member',
      httpStatusCode.UNAUTHORIZED
    );
  }

  const task = await prisma.task.create({
    data: {
      ...payload,
      projectId: payload.projectId,
      assignedToId: payload.assignedToId,
    },
  });
  return task;
};


const myAssignedTasks = async (userId: string) => {
  const tasks = await prisma.task.findMany({
    where: { assignedToId: userId },
  });
  return tasks;
};

export const taskServices = {
  assignedTasks,
  myAssignedTasks,
};
