import { NextFunction, Request, Response } from 'express';
import { Prisma } from '../../generated/prisma';
import httpStatusCode from 'http-status-codes';

export const globalErrrHandle = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  const errSource: any = [];

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      statusCode = httpStatusCode.CONFLICT;
      message = 'Duplicate field value';

      errSource.push(err.meta);
    }
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') {
      statusCode = httpStatusCode.NOT_FOUND;
      message = 'Data not found';
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = httpStatusCode.BAD_REQUEST;
    const lines = err.message.split('\n');
    message = lines[lines.length - 1].trim();
  }

  res.status(statusCode).json({
    success: false,
    message,
    errSource,
  });
};
