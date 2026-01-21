import { Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { sendResponse } from '../../utils/sendResponse';
import httpStatusCode from 'http-status-codes';
import { projectServices } from './project.services';
import { Ijwt } from '../../types/user.interface';

const createProject = createAsyncFn(async (req: Request, res: Response) => {
  const payload = req.body;
  const { userId } = req.user as Ijwt;
  const project = await projectServices.createProject(payload, userId);

  sendResponse(res, {
    statusCode: httpStatusCode.CREATED,
    success: true,
    message: 'Project created successfully',
    data: project,
  });
});

const getMyOrgProjects = createAsyncFn(async (req: Request, res: Response) => {
  const {userId} = req.user as Ijwt;
  const projects = await projectServices.getMyOrgProjects(userId);
  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    success: true,
    message: 'Projects fetched successfully',
    data: projects,
  });
});

export const projectController = {
  createProject,
  getMyOrgProjects,
};
