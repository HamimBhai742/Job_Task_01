import { prisma } from '../../config/prisma.configs';

const createOrganization = async (payload: any) => {
  const org = await prisma.organization.create({
    data: payload,
  });
  return org;
};

export const organizationServices = {
  createOrganization,
};
