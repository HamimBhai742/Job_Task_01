import { Response } from 'express';

interface IMetaDta {
  total: number;
}
interface IResponse<T> {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
  metaData?: IMetaDta;
}

export const sendResponse = <T>(res: Response, data: IResponse<T>) => {
  res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    data: data.data,
    metaData: data.metaData,
  });
};