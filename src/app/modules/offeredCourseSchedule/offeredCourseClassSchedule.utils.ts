import { OfferedCourseClassSchedule } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { hasTimeConflict } from '../../../shared/utils';

const checkRoomAvailability = async (data: OfferedCourseClassSchedule) => {
  const alreadyBookedRoomOnDay =
    await prisma.offeredCourseClassSchedule.findMany({
      where: {
        dayOfWeek: data.dayOfWeek,
        room: {
          id: data.roomId,
        },
      },
    });

  const existtingSlots = alreadyBookedRoomOnDay.map(schedule => ({
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    dayOfWeek: schedule.dayOfWeek,
  }));

  const newSlot = {
    startTime: data.startTime,
    endTime: data.endTime,
    dayOfWeek: data.dayOfWeek,
  };

  if (hasTimeConflict(existtingSlots, newSlot)) {
    throw new ApiError(httpStatus.CONFLICT, 'Room is already booked');
  }
};

const checkFacultyAvailability = async (data: OfferedCourseClassSchedule) => {
  const alreadyAssignedFaculty =
    await prisma.offeredCourseClassSchedule.findMany({
      where: {
        dayOfWeek: data.dayOfWeek,
        faculty: {
          id: data.facultyId,
        },
      },
    });

    const existtingSlots = alreadyAssignedFaculty.map(schedule => ({
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      dayOfWeek: schedule.dayOfWeek,
    }));
  
    const newSlot = {
      startTime: data.startTime,
      endTime: data.endTime,
      dayOfWeek: data.dayOfWeek,
    };
  
    if (hasTimeConflict(existtingSlots, newSlot)) {
      throw new ApiError(httpStatus.CONFLICT, 'Faculty is already assigned');
    }
};

export const OfferedCourseScheduleUtils = {
  checkRoomAvailability,
  checkFacultyAvailability,
};
