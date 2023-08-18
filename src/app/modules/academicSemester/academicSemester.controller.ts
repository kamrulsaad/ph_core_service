import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import { AcademuicSemesterService } from './academicSemester.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { AcademicSemesterFilterableFields } from './academicSemester.constant';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademuicSemesterService.insertIntoDB(req.body);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AcademicSemesterFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  const result = await AcademuicSemesterService.getAllFromDB(filters, options);
  sendResponse<AcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

export const AcademicSemesterController = {
  insertIntoDB,
  getAllFromDB,
};
