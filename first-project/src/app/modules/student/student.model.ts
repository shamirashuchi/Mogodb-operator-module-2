import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import {
  TGuardian,
  TLocalGuardian,
  StudentMethod,
  StudentModel,
  TUserName,
  Tstudent,
} from './student.interface';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'First name can not be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1); //Mezba
        return firstNameStr === value;
        //console.log(value); //firstname
      },
      message: '{VALUE} is not in a capitalize format',
    },
  },
  middleName: {
    type: String,
    trim: true,
    required: [true, 'Middle name is required'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, "Father's name is required"],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, "Father's contact number is required"],
  },
  motheName: {
    type: String,
    trim: true,
    required: [true, "Mother's name is required"],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, "Mother's occupation is required"],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, "Mother's contact number is required"],
  },
});

const localguardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, "Local guardian's name is required"],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: String,
    trim: true,
    required: [true, "Local guardian's address is required"],
  },
});

const studentSchema = new Schema<Tstudent, StudentModel>(
  {
    id: {
      type: String,
      trim: true,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'password is required'],
      maxlength: [20, 'Password can not be more than 20 characters'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student name is required'],
    },
    gender: {
      type: String,
      trim: true,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          "{VALUE} is not valid. The gender field can only be one of the following: 'male', 'female' or 'other'.",
      },
      required: [true, 'Gender is required'],
    },
    dateofBirth: { type: String },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email type',
      },
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      trim: true,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      trim: true,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      trim: true,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      trim: true,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      trim: true,
      required: [true, 'TGuardian information is required'],
    },
    localguardian: {
      type: localguardianSchema,
      trim: true,
      required: [true, 'Local guardian information is required'],
    },
    profileImg: { type: String },
    isActive: {
      type: String,
      trim: true,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual
studentSchema.virtual('fullname').get(function () {
  return `${this.name.firstName}  ${this.name.middleName}  ${this.name.lastName}`;
});
//document middleware
//pre save middleware/hook : will work on create() and save() function
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save the data');
  //hashing password and save into db
  const user = this; //this is the data i send from postman
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//post save middleware/hook
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  console.log('post hook : we saved the data');
  next();
});

//query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//[{$match': {isDeleted: {$ne: true}} } } { '$match': { id: '12345' } } ]
studentSchema.pre('aggregate', function (next) {
  //console.log(this.pipeline());
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
//for custom instance method
// const studentSchema = new Schema<Tstudent, StudentModel, StudentMethod>({
//   id: {
//     type: String,
//     trim: true,
//     required: [true, 'Student ID is required'],
//     unique: true,
//   },
//   name: {
//     type: userNameSchema,
//     required: [true, 'Student name is required'],
//   },
//   gender: {
//     type: String,
//     trim: true,
//     enum: {
//       values: ['male', 'female', 'other'],
//       message:
//         "{VALUE} is not valid. The gender field can only be one of the following: 'male', 'female' or 'other'.",
//     },
//     required: [true, 'Gender is required'],
//   },
//   dateofBirth: { type: String },
//   email: {
//     type: String,
//     trim: true,
//     required: [true, 'Email is required'],
//     unique: true,
//     validate: {
//       validator: (value: string) => validator.isEmail(value),
//       message: '{VALUE} is not a valid email type',
//     },
//   },
//   contactNo: { type: String, required: [true, 'Contact number is required'] },
//   emergencyContactNo: {
//     type: String,
//     trim: true,
//     required: [true, 'Emergency contact number is required'],
//   },
//   bloodGroup: {
//     type: String,
//     trim: true,
//     enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//   },
//   presentAddress: {
//     type: String,
//     trim: true,
//     required: [true, 'Present address is required'],
//   },
//   permanentAddress: {
//     type: String,
//     trim: true,
//     required: [true, 'Permanent address is required'],
//   },
//   guardian: {
//     type: guardianSchema,
//     trim: true,
//     required: [true, 'TGuardian information is required'],
//   },
//   localguardian: {
//     type: localguardianSchema,
//     trim: true,
//     required: [true, 'Local guardian information is required'],
//   },
//   profileImg: { type: String },
//   isActive: {
//     type: String,
//     trim: true,
//     enum: ['active', 'blocked'],
//     default: 'active',
//   },
// });

//creating a custom instance method
// studentSchema.methods.isUserExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

export const Student = model<Tstudent, StudentModel>('student', studentSchema);
