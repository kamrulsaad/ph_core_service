import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { OfferedCourseService } from './offeredCourse.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { OfferedCourse } from '@prisma/client';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseService.insertIntoDB(req.body);
  sendResponse<OfferedCourse[]>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Offered Course created successfully',
    data: result,
  });
});

export const OfferedCourseController = {
  insertIntoDB,
};
