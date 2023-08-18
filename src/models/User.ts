import mongoose, { Schema, Document } from 'mongoose';
import createModel from '@/lib/mogodb';

// Define schema for certifications
const certificationSchema: Schema = new mongoose.Schema({
  title: String,
  organization: String
});

// Define schema for experiences
const experienceSchema: Schema = new mongoose.Schema({
  companyName: String,
  position: String,
  yearOfWork: String,
  type: { type: String, enum: ['part-time', 'full-time'] },
  companyImage: String
});

// Define schema for education
const educationSchema: Schema = new mongoose.Schema({
  title: String,
  yearOfWork: String,
  collegeName: String,
  collegeDetails: String
});

// Define schema for connections
export const connectionSchema: Schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Define schema for users
const userSchema: Schema = new mongoose.Schema({
  name: String,
  profilePhoto: String,
  password: String,
  email: String,
  phoneNo: String,
  about: String,
  skills: [String],
  professionalDetail: String,
  certifications: [certificationSchema],
  experiences: [experienceSchema],
  education: [educationSchema],
  connections: [connectionSchema]
});

// Create the User model
export interface IUser extends Document {
  name: string;
  profilePhoto: string;
  password: string;
  email: string;
  phoneNo: string;
  about: string;
  skills: string[];
  professionalDetail: string;
  certifications: Array<{
    title: string;
    organization: string;
  }>;
  experiences: Array<{
    companyName: string;
    position: string;
    yearOfWork: string;
    type: 'part-time' | 'full-time';
    companyImage: string;
  }>;
  education: Array<{
    title: string;
    yearOfWork: string;
    collegeName: string;
    collegeDetails: string;
  }>;
  connections: Array<{
    user: mongoose.Schema.Types.ObjectId;
  }>;
}

export default createModel("User",userSchema)

