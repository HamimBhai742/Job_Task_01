import { Role } from '../../generated/prisma';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
interface IPayload {
  userId: string;
  email: string;
  role: Role;
}
export const createJwtToken = (
  payload: IPayload,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
};


export const verifyJwtToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};