import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { OfferedCourseScheduleService } from './offeredCourseSchedule.service';
import sendResponse from '../../../shared/sendResponse';
import { OfferedCourseClassSchedule } from '@prisma/client';
import httpStatus from 'http-status';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseScheduleService.insertIntoDB(req.body);
  sendResponse<OfferedCourseClassSchedule>(res, {
    message: 'Offered course class schedule created successfully',
    data: result,
    statusCode: httpStatus.CREATED,
    success: true,
  });
});

export const OfferedCourseScheduleController = {
  insertIntoDB,
};
