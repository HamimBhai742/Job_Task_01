import { Role } from "../../generated/prisma";

export interface Ijwt {
  userId: string;
  email: string;
  role: Role;
}