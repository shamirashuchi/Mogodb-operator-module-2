import { Types } from 'mongoose';
import { Model } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motheName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Tstudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateofBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localguardian: TLocalGuardian;
  profileImg?: string;
  admissionSemester: Types.ObjectId;
  isDeleted: boolean;
};

//for creating static
export interface StudentModel extends Model<Tstudent> {
  isUserExist(id: string): Promise<Tstudent | null>;
}

//for creating instance
// export type StudentMethod = {
//   isUserExist(id: string): Promise<Tstudent | null>;
// };

// export type StudentModel = Model<
//   Tstudent,
//   Record<string, never>,
//   StudentMethod
// >;
