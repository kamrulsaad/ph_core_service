import express from 'express';
import { OfferedCourseScheduleController } from './offeredCourseSchedule.controller';
const router = express.Router();

router.post('/', OfferedCourseScheduleController.insertIntoDB);

export const OfferedCourseScheduleRoute = router;
