import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { facultyRoutes } from '../modules/faculty/faculty.route';
import { studentRoutes } from '../modules/student/student.route';
import { BuildingRoutes } from '../modules/building/building.route';
import { roomRoutes } from '../modules/room/room.route';
import { courseRoutes } from '../modules/course/course.route';
import { semesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route';
import { OfferedCourseRoutes } from '../modules/offeredCourse/offeredCourse.route';
import { OfferedCourseSectionRoutes } from '../modules/offeredCourseSection/offeredCourseSection.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoutes,
  },
  {
    path: '/faculties',
    route: facultyRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/buildings',
    route: BuildingRoutes,
  },
  {
    path: '/rooms',
    route: roomRoutes,
  },
  {
    path: '/courses',
    route: courseRoutes,
  },
  {
    path: '/semester-registration',
    route: semesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: OfferedCourseRoutes,
  },
  {
    path: '/offered-course-sections',
    route: OfferedCourseSectionRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
