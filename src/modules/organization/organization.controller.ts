import { NextFunction, Request, Response } from 'express';
import { createAsyncFn } from '../../utils/create.async.fn';
import { organizationServices } from './organization.services';
import { sendResponse } from '../../utils/sendResponse';
import httpStatusCode from 'http-status-codes';

const createOrganization = createAsyncFn(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const org = await organizationServices.createOrganization(payload);
    sendResponse(res, {
      statusCode: httpStatusCode.CREATED,
      success: true,
      message: 'Organization created successfully',
      data: org,
    });
  }
);


const getAllOrganization = createAsyncFn(
  async (req: Request, res: Response) => {
    const org = await organizationServices.getAllOrganization();
    sendResponse(res, {
      statusCode: httpStatusCode.OK,
      success: true,
      message: 'Organization fetched successfully',
      data: org,
    });
  }
);

export const organizationController = {
  createOrganization,
  getAllOrganization
};
