import { NextFunction, Request, Response } from 'express';
import httpStatusCode from 'http-status-codes';
import { AppError } from '../error/coustom.error';
import { verifyJwtToken } from '../utils/create.jwt';
import { ENV } from '../config/env';
import { prisma } from '../config/prisma.configs';
import { Ijwt } from '../types/user.interface';

export const checkAuth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req?.cookies?.accessToken || req?.headers?.authorization;
      if (!token) {
        throw new AppError(
          'You are not login, please login first',
          httpStatusCode.UNAUTHORIZED
        );
      }
      const decod = verifyJwtToken(token, ENV.JWT_SECRET);

      const user = await prisma.user.findUnique({
        where: { email: decod.email },
      });

      if (!user) {
        throw new AppError('User not found', httpStatusCode.NOT_FOUND);
      }

      if (!roles.includes(decod.role)) {
        throw new AppError(
          'You are not authorized to access this route',
          httpStatusCode.UNAUTHORIZED
        );
      }

      req.user = decod as Ijwt;
      next();
    } catch (error) {
      next(error);
    }
  };
