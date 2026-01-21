import { NextFunction, Request, Response } from 'express';

export const globalErrrHandle = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  const errSource: any = [];

  res.status(statusCode).json({
    success: false,
    message,
    errSource,
  });
};
