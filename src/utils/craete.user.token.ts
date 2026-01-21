import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';
import { createJwtToken } from './create.jwt';
export const craeteUserToken = (user: any) => {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createJwtToken(
    payload,
    ENV.JWT_SECRET,
    ENV.JWT_EXPIRES_IN
  );
  return { accessToken };
};
