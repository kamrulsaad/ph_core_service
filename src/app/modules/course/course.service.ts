import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { ICourseCreateData, ICourseFilterRequest } from './course.interface';
import { Course, Prisma } from '@prisma/client';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { courseSearchableFields } from './course.constant';

const insertIntoDB = async (data: ICourseCreateData): Promise<any> => {
  const { preRequisiteCourses, ...courseData } = data;

  const newCourse = await prisma.$transaction(async transactionClient => {
    const course = await transactionClient.course.create({
      data: courseData,
    });

    if (!course) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Course not created');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      for (let i = 0; i < preRequisiteCourses.length; i++) {
        await transactionClient.courseToPrerequisite.create({
          data: {
            courseId: course.id,
            prerequisiteId: preRequisiteCourses[i].courseId,
          },
        });
      }
    }

    return course;
  });

  if (newCourse) {
    const resposnseData = await prisma.course.findUnique({
      where: {
        id: newCourse.id,
      },
      include: {
        preRequisite: {
          include: {
            prerequisite: true,
          },
        },
        preRequisiteFor: {
          include: {
            course: true,
          },
        },
      },
    });
    return resposnseData;
  }

  throw new ApiError(httpStatus.BAD_REQUEST, 'Course not created');
};

const getAllFromDB = async (
  filters: ICourseFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Course[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
      andConditions.push({
          OR: courseSearchableFields.map((field) => ({
              [field]: {
                  contains: searchTerm,
                  mode: 'insensitive'
              }
          }))
      });
  }

  if (Object.keys(filterData).length > 0) {
      andConditions.push({
          AND: Object.keys(filterData).map((key) => ({
              [key]: {
                  equals: (filterData as any)[key]
              }
          }))
      });
  }

  const whereConditions: Prisma.CourseWhereInput =
      andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.course.findMany({
      include: {
          preRequisite: {
              include: {
                  prerequisite: true
              }
          },
          preRequisiteFor: {
              include: {
                  course: true
              }
          }
      },
      where: whereConditions,
      skip,
      take: limit,
      orderBy:
          options.sortBy && options.sortOrder
              ? { [options.sortBy]: options.sortOrder }
              : {
                  createdAt: 'desc'
              }
  });
  const total = await prisma.course.count({
      where: whereConditions
  });

  return {
      meta: {
          total,
          page,
          limit
      },
      data: result
  };
};

const getByIdFromDB = async (id: string): Promise<Course | null> => {
  const result = await prisma.course.findUnique({
      where: {
          id
      },
      include: {
          preRequisite: {
              include: {
                  prerequisite: true
              }
          },
          preRequisiteFor: {
              include: {
                  course: true
              }
          }
      }
  });
  return result;
};


/// I intend to explore the update course functionalities in the upcoming module.



const deleteByIdFromDB = async (id: string): Promise<Course> => {
  await prisma.courseToPrerequisite.deleteMany({
      where: {
          OR: [
              {
                  courseId: id
              },
              {
                  prerequisiteId: id
              }
          ]
      }
  });

  const result = await prisma.course.delete({
      where: {
          id
      }
  });
  return result;
};


export const CourseService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  deleteByIdFromDB
}