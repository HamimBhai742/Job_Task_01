import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../utils/create.async.fn';
import passport from 'passport';
import { AppError } from '../error/coustom.error';
import { sendResponse } from '../utils/sendResponse';
import httpStatusCodes from 'http-status-codes';
import { craeteUserToken } from '../utils/craete.user.token';
import { setCookies } from '../utils/set.cookies';
const login = createAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', async (err: any, user: any, info: any) => {
      if (err) {
        return next(new AppError(err, httpStatusCodes.BAD_REQUEST));
      }
      if (!user) {
        return next(new AppError(info.message, httpStatusCodes.UNAUTHORIZED));
      }
      const userToken = craeteUserToken(user);
      setCookies(res, userToken);
      delete user.password;
      //send response
      sendResponse(res, {
        statusCode: httpStatusCodes.OK,
        success: true,
        message: 'You have successfully logged in.',
        data: {
          accessToken: userToken.accessToken,
          user,
        },
      });
    })(req, res, next);
  }
);

export const authController = {
  login,
};
