import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

//will call controller function
router.get('/', StudentControllers.getAllstudent);
router.get('/:studentId', StudentControllers.getsinglestudent);
router.delete('/:studentId', StudentControllers.deletestudent);
export const StudentRoutes = router;
