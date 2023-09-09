/* eslint-disable @typescript-eslint/no-explicit-any */
const getAvailableCourses = (
  offeredCourse: any[],
  studentCompletedCourses: any,
  studentCurrentlyTakenCourses: any
) => {
  const completedCoursesID = studentCompletedCourses.map(
    (course: any) => course.courseId
  );

  const availableCoursesList = offeredCourse
    .filter((course: any) => !completedCoursesID.includes(course.courseId))
    .filter((offeredCourse: any) => {
      const preRequisites = offeredCourse.course.preRequisite;
      if (preRequisites.length === 0) return true;
      else {
        const preRequisiteIds = preRequisites.map(
          (preRequisite: any) => preRequisite.prerequisiteId
        );
        return preRequisiteIds.every((id: string) => completedCoursesID.includes(id))
      }
    })
    .map((course: any) => {
        const isAlreadyTaken = studentCurrentlyTakenCourses.find(
            (c: any) => c.offeredCourseId === course.id
        )

        if(isAlreadyTaken){
            course.offeredCourseSections.map((section: any) => {
                if(section.id === isAlreadyTaken.offeredCourseSectionId){
                    section.isTaken = true;
                }
                else {
                    section.isTaken = false;
                }
            })
            return {
                ...course,
                isTaken: true,
            }
        }
        else {
            course.offeredCourseSections.map((section: any) => {
                section.isTaken = false;
            });
            return {
                ...course,
                isTaken: false,
            }
        }
    })

    return availableCoursesList;
};

export const SemesterRegistrationUtils = {
  getAvailableCourses,
};
