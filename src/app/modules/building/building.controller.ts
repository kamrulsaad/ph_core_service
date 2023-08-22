import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BuildingService } from './building.service';
import sendResponse from '../../../shared/sendResponse';
import { Building } from '@prisma/client';
import { buildingFilterableFields } from './building.contant';
import pick from '../../../shared/pick';
import httpStatus from 'http-status';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.insertIntoDB(req.body);
  sendResponse<Building>(res, {
    statusCode: httpStatus.CREATED,
    data: result,
    success: true,
    message: 'Building created successfully',
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, buildingFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

  const result = await BuildingService.getAllFromDB(filters, options);
  sendResponse<Building[]>(res, {
    statusCode: httpStatus.OK,
    data: result.data,
    meta: result.meta,
    success: true,
    message: 'Buildings fetched successfully',
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BuildingService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Building fetched successfully',
        data: result
    });
});

const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BuildingService.updateOneInDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Building updated successfully',
        data: result
    });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BuildingService.deleteByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Building delete successfully',
        data: result
    });
});


export const BuildingController = {
    insertIntoDB,
    getAllFromDB,
    getByIdFromDB,
    updateOneInDB,
    deleteByIdFromDB
}
