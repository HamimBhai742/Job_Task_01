import { Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { userService } from './user.services';
import { sendResponse } from '../../utils/sendResponse';
import httpStatusCode from 'http-status-codes';
import { Ijwt } from '../../types/user.interface';

const createOrgAdmin = createAsyncFn(async (req: Request, res: Response) => {
  const { email, password, organizationId } = req.body;
  const user = await userService.createOrgAdmin(
    email,
    password,
    organizationId
  );

  sendResponse(res, {
    statusCode: httpStatusCode.CREATED,
    success: true,
    message: 'User created successfully',
    data: user,
  });
});

const createOrgMember = createAsyncFn(async (req: Request, res: Response) => {
  const { email, password, organizationId } = req.body;
  const { userId } = req.user as Ijwt;
  const user = await userService.createOrgMember(
    userId,
    email,
    password,
    organizationId
  );
  sendResponse(res, {
    statusCode: httpStatusCode.CREATED,
    success: true,
    message: 'User created successfully',
    data: user,
  });
});

export const userController = {
  createOrgAdmin,
  createOrgMember,
};
