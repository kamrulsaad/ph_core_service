import express from 'express';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRoutes
  },
  // {
  //   path: '/academic-departments',
  //   route: academicDepartmentRoutes
  // },
  // {
  //   path: '/faculties',
  //   route: facultyRoutes
  // },
  // {
  //   path: '/students',
  //   route: studentRoutes
  // },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
