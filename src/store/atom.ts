import { atom } from "recoil";
import mongoose from "mongoose";

export const pannelOpen = atom<boolean>({
  key: "pannelOpen",
  default: false,
});

export const currentSeletedTab = atom<number>({
  key: "currentSeletedTab",
  default: 0,
});

// Personal Detail Section
export interface CertificationType {
  title: string;
  organization: string;
}

export interface ExperienceType {
  companyName: string;
  position: string;
  yearOfWork: string;
  type: 'part-time' | 'full-time'; // Use a string literal type for 'type'
  companyImage: string;
}

export interface EducationType {
  title: string;
  yearOfWork: string;
  collegeName: string;
  collegeDetails: string;
}

export interface ConnectionType {
  user: { type: mongoose.Schema.Types.ObjectId; ref: 'User' };
}

export interface PersonalDetailType {
  _id?:string;
  name?: string;
  profilePhoto?: string;
  password?: string;
  email?: string;
  phoneNo?: string;
  about?: string;
  skills?: string[];
  professionalDetail?: string;
  certifications?: CertificationType[];
  experiences?: ExperienceType[];
  education?: EducationType[];
  connections?: ConnectionType[];
}
export interface ConnectionDetailType {
  userId?:string;
  name?: string;
  profilePhoto?: string;
  password?: string;
  email?: string;
  phoneNo?: string;
  about?: string;
  skills?: string[];
  professionalDetail?: string;
  certifications?: CertificationType[];
  experiences?: ExperienceType[];
  education?: EducationType[];
  connections?: ConnectionType[];
}


export const initialPersonalDetail: PersonalDetailType = {
  name: '',
  profilePhoto: '',
  password: '',
  email: '',
  phoneNo: '',
  about: '',
  skills: [],
  professionalDetail: '',
  certifications: [],
  experiences: [],
  education: [],
  connections: [],
};

export const personalDetailData = atom<PersonalDetailType>({
  key: "personalDetailData",
  default: initialPersonalDetail,
});


export const aboutData = atom<string>({
  key: "aboutData",
  default: "",
});


//open editing popups
export const certificatePopUp = atom<boolean>({
  key:"certificatePopUp",
  default:false,
})
