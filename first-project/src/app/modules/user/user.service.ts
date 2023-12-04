import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Tstudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, studentData: Tstudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  // find academic semester info
  const AdmissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  );

  //set  generated id
  if (AdmissionSemester !== null) {
    // Set generated id
    userData.id = await generateStudentId(AdmissionSemester);
  } else {
    // Handle the case where AdmissionSemester is null
    console.error('Admission semester not found');
  }

  //set manually generated it
  //userData.id = '2030100001';

  // create a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; //reference _id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
