import { OfferedCourseClassSchedule } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { OfferedCourseScheduleUtils } from './offeredCourseClassSchedule.utils';

const insertIntoDB = async (
  data: OfferedCourseClassSchedule
): Promise<OfferedCourseClassSchedule> => {
  await OfferedCourseScheduleUtils.checkRoomAvailability(data);

  const result = await prisma.offeredCourseClassSchedule.create({
    data,
    include: {
      semesterRegistration: true,
      faculty: true,
      room: true,
      offeredCourseSection: true,
    },
  });
  return result;
};

export const OfferedCourseScheduleService = {
  insertIntoDB,
};
