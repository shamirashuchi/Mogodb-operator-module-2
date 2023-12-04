import { Tstudent } from './student.interface';
import { Student } from './student.model';

// const createStudentIntoDB = async (studentData: Tstudent) => {
//   if (await Student.isUserExist(studentData.id)) {
//     throw new Error('User already exists!');
//   }
//   const result = await Student.create(studentData); //built in static method
//   return result;
//   // const student = new Student(studentData);
//   // console.log(student);

//   // try {
//   //   if (await student.isUserExist(studentData.id)) {
//   //     throw new Error('User already exists!');
//   //   }
//   //   const result = await student.save();
//   //   return result;
//   // } catch (error: unknown) {
//   //   if (error instanceof Error) {
//   //     // Handle the error, e.g., log it or throw a specific error
//   //     throw new Error(`Error creating student: ${error.message}`);
//   //   } else {
//   //     throw new Error('An unknown error occurred.');
//   //   }
//   // }
// };

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getsingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  // return result;
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentService = {
  getAllStudentFromDB,
  getsingleStudentFromDB,
  deleteStudentFromDB,
};
