import { Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { taskServices } from './task.services';
import { Ijwt } from '../../types/user.interface';
import { sendResponse } from '../../utils/sendResponse';
import httpStatusCode from 'http-status-codes';

const assignedTasks = createAsyncFn(async (req: Request, res: Response) => {
  const { userId } = req.user as Ijwt;
  const tasks = await taskServices.assignedTasks(req.body, userId);
  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    success: true,
    message: 'Tasks fetched successfully',
    data: tasks,
  });
});

const myAssignedTasks = createAsyncFn(async (req: Request, res: Response) => {
  const { userId } = req.user as Ijwt;
  const tasks = await taskServices.myAssignedTasks(userId);
  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    success: true,
    message: 'Tasks fetched successfully',
    data: tasks,
  });
});

export const taskController = {
  assignedTasks,
  myAssignedTasks,
};
