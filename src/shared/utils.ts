import { WeekDays } from '@prisma/client';

export const asyncForEach = async (array: any[], callback: any) => {
  if (!Array.isArray(array)) {
    throw new Error('First argument must be an array');
  }
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const hasTimeConflict = (
  existtingSlots: {
    startTime: string;
    endTime: string;
    dayOfWeek: WeekDays;
  }[],
  newSlot: {
    startTime: string;
    endTime: string;
    dayOfWeek: WeekDays;
  }
) => {
  for (const slot of existtingSlots) {
    const existingStart = new Date(`1970-01-01T${slot.startTime}:00.000Z`);
    const existingEnd = new Date(`1970-01-01T${slot.endTime}:00.000Z`);
    const newStart = new Date(`1970-01-01T${newSlot.startTime}:00.000Z`);
    const newEnd = new Date(`1970-01-01T${newSlot.endTime}:00.000Z`);

    if (newStart < existingEnd && newEnd > existingStart) {
      return true;
    }
  }

  return false;
};
