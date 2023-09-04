import express from 'express';
import { OfferedCourseScheduleController } from './offeredCourseSchedule.controller';
const router = express.Router();

router.post('/', OfferedCourseScheduleController.insertIntoDB);

router.get('/', OfferedCourseScheduleController.getAllFromDB);

export const OfferedCourseScheduleRoute = router;
