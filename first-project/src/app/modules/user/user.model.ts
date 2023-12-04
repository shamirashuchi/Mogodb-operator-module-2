import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

//document middleware
//pre save middleware/hook : will work on create() and save() function
userSchema.pre('save', async function (next) {
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
userSchema.post('save', function (doc, next) {
  doc.password = '';
  console.log('post hook : we saved the data');
  next();
});

export const User = model<TUser>('User', userSchema);
