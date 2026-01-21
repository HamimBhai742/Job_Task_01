import { prisma } from '../../config/prisma.configs';

const createOrganization = async (payload: any) => {
  const org = await prisma.organization.create({
    data: payload,
  });
  return org;
};

const getAllOrganization = async () => {
  const org = await prisma.organization.findMany();
  return org;
};

export const organizationServices = {
  createOrganization,
  getAllOrganization,
};
