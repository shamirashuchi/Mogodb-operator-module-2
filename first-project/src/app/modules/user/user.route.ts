import express from 'express';
import { UserControllers } from './user.controller';
import { studentvalidations } from '../student/student.validation';
import validateRequest from '../../middlwares/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentvalidations.studentvalidationSchemausingzod),
  UserControllers.createStudent,
);
export const UserRoutes = router;
