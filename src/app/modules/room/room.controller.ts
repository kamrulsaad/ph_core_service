import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { Room } from '@prisma/client';
import { RoomService } from './room.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.insertIntoDB(req.body);
  sendResponse<Room>(res, {
    statusCode: httpStatus.CREATED,
    data: result,
    success: true,
    message: 'Room created successfully',
  });
});

export const RoomController = {
  insertIntoDB,
};
