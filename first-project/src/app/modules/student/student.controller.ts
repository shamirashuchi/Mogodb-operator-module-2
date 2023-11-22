import { Request, Response } from 'express';
import { StudentService } from './student.service';
// import studentvalidationSchema from './Tstudent.validation';
//import { z } from 'zod';
import studentvalidationSchemausingzod from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    //console.log('Received data:', req.body);
    const { student: studentdata } = req.body;
    // const { error, value } = studentvalidationSchema.validate(studentdata);
    //validate data is in value
    // const { error, value } = studentvalidationSchema.validate(studentdata);
    //console.log({ error }, { value });

    //creating a schema validation using zod
    const zodparsedData = studentvalidationSchemausingzod.parse(studentdata);
    const result = await StudentService.createStudentIntoDB(zodparsedData);
    console.log(result);
    // if (error) {
    //   res.status(400).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   });
    // }
    //will call service function to send this data
    //console.log('Received data:', studentdata);

    //send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something go wrong',
      error: err,
    });
  }
};

const getAllstudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something go wrong',
      error: err,
    });
  }
};

const getsinglestudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getsingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something go wrong',
      error: err,
    });
  }
};

const deletestudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something go wrong',
      error: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllstudent,
  getsinglestudent,
  deletestudent,
};
