import { Role } from '../../../generated/prisma';
import { prisma } from '../../config/prisma.configs';
import { AppError } from '../../error/coustom.error';
import httpStatusCode from 'http-status-codes';
const createProject = async (payload: any, userId: string) => {
  const orgAdmin = await prisma.user.findUnique({
    where: { id: userId, role: Role.OG_ADMIN },
  });

  if (orgAdmin?.organizationId !== payload?.organizationId) {
    throw new AppError(
      'You are not authorized to create a project for this organization',
      httpStatusCode.UNAUTHORIZED
    );
  }
  const project = await prisma.project.create({
    data: payload,
  });
  return project;
};

const getMyOrgProjects = async (userId: string) => {
  const orgAdmin = await prisma.user.findUnique({
    where: { id: userId, role: Role.OG_ADMIN },
  });
  const organizationId = orgAdmin?.organizationId;
  if (!organizationId) {
    throw new AppError(
      'Organization Id is required',
      httpStatusCode.BAD_REQUEST
    );
  }
  const projects = await prisma.project.findMany({
    where: { organizationId },
    include: { organization: true, tasks: true },
  });
  return projects;
};

export const projectServices = {
  createProject,
  getMyOrgProjects,
};
