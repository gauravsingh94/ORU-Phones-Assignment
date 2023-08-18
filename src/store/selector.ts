import { atom, selector } from 'recoil';
import { personalDetailData,ConnectionType,CertificationType,ExperienceType,EducationType } from './atom';

export const nameSelector = selector<string | undefined>({
  key: 'nameSelector',
  get: ({ get }) => {
    const personalDetail = get(personalDetailData);
    return personalDetail.name;
  },
});

export const aboutSelector = selector<string | undefined>({
  key: 'aboutSelector',
  get: ({ get }) => {
    const personalDetail = get(personalDetailData);
    return personalDetail.about;
  },
});

export const skillsSelector = selector<string[] | undefined>({
  key: 'skillsSelector',
  get: ({ get }) => {
    const personalDetail = get(personalDetailData);
    return personalDetail.skills;
  },
});

export const certificationSelector = selector<CertificationType[] | undefined>({
  key: 'certificationSelector',
  get: ({ get }) => {
    const personalDetail = get(personalDetailData);
    return personalDetail.certifications;
  },
});


export const experienceSelector = selector<ExperienceType[] | undefined>({
  key: 'experienceSelector',
  get: ({ get }) => {
    const personalDetail = get(personalDetailData);
    return personalDetail.experiences;
  },
});

export const educationSelector = selector<EducationType[] | undefined>({
  key: 'educationSelector',
  get: ({ get }) => {
    const personalDetail = get(personalDetailData);
    return personalDetail.education;
  },
});

export const connectionsSelector = selector<ConnectionType[] | undefined>({
  key: 'connectionsSelector',
  get: ({ get }) => {
    const personalDetail = get(personalDetailData);
    return personalDetail.connections;
  },
});


export const profilePhotoSelector = selector<string| undefined>({
  key: 'profilePhotoSelector',
  get: ({ get }) => {
    const personalDetail = get(personalDetailData);
    return personalDetail.profilePhoto ;
  },
});

interface EmailPhoneNameType{
  name?:string;
  email?:string;
  phoneNo?:string;
}
export const personalDetailSelector = selector<EmailPhoneNameType>({
  key: 'personalDetailSelector',
  get: ({ get }) => {
    const personalDetail = get(personalDetailData);
    return  {
      name:personalDetail.name,
      email:personalDetail.email,
      phoneNo:personalDetail.phoneNo
    }
  },
});




