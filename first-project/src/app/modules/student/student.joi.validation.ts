import Joi from 'joi';
//creating a schema validation using joi
const userNamevalidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .message(
      'First name must start with a capital letter and only contain alphabetic characters',
    ),

  middleName: Joi.string().trim().required(),

  lastName: Joi.string()
    .required()
    .trim()
    .regex(/^[A-Za-z]+$/)
    .message('Last name must only contain alphabetic characters'),
});

const guardianvalidationSchema = Joi.object({
  fatherName: Joi.string().trim().required(),
  fatherOccupation: Joi.string().trim().required(),
  fatherContactNo: Joi.string().trim().required(),

  motheName: Joi.string().trim().required(),
  motherOccupation: Joi.string().trim().required(),
  motherContactNo: Joi.string().trim().required(),
});

const localguardianvalidationSchema = Joi.object({
  name: Joi.string().trim().required(),
  occupation: Joi.string().trim().required(),
  contactNo: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
});

const studentvalidationSchema = Joi.object({
  id: Joi.string().trim().required(),
  name: userNamevalidationSchema.required(),
  gender: Joi.string().trim().valid('male', 'female', 'other').required(),
  dateofBirth: Joi.string(),
  email: Joi.string().trim().email().required(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().trim().required(),
  bloodGroup: Joi.string()
    .trim()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
  presentAddress: Joi.string().trim().required(),
  permanentAddress: Joi.string().trim().required(),
  guardian: guardianvalidationSchema.required(),
  localguardian: localguardianvalidationSchema.required(),
  profileImg: Joi.string(),
  isActive: Joi.string().trim().valid('active', 'blocked').default('active'),
});
export default studentvalidationSchema;
