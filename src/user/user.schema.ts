import * as mongoose from 'mongoose';
import validator from 'validator';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    validate: { validator: validator.isEmail, message: 'Email is not valid' },
    lowercase: true,
    required: true,
  },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
