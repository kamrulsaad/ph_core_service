import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { OfferedCourseScheduleService } from './offeredCourseSchedule.service';
import sendResponse from '../../../shared/sendResponse';
import { OfferedCourseClassSchedule } from '@prisma/client';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { offeredCourseClassScheduleFilterableFields } from './offeredCourseSchedule.constant';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseScheduleService.insertIntoDB(req.body);
  sendResponse<OfferedCourseClassSchedule>(res, {
    message: 'Offered course class schedule created successfully',
    data: result,
    statusCode: httpStatus.CREATED,
    success: true,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, offeredCourseClassScheduleFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await OfferedCourseScheduleService.getAllFromDB(
    filters,
    options
  );
  sendResponse<OfferedCourseClassSchedule[]>(res, {
    message: 'Offered course class schedule fetched successfully',
    data: result.data,
    meta: result.meta,
    statusCode: httpStatus.OK,
    success: true,
  });
});

export const OfferedCourseScheduleController = {
  insertIntoDB,
  getAllFromDB,
};
