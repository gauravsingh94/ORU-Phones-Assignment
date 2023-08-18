"use client";
import { useState } from "react";
import CertificationSvg from "../../public/Vector";
import axios from "axios";
import {  useRecoilValue, useSetRecoilState } from "recoil";
import { certificatePopUp } from "@/store/atom";

interface PropsType{
  title:string;
  organization:string;
}
const CertificationCourse = (props:PropsType) => {
  const isEditing = useRecoilValue(certificatePopUp);
  const setIsEditing = useSetRecoilState(certificatePopUp);
  const [title, setTitle] = useState('');
  const [organization, setOrganization] = useState('');

  const handleSave = () => {
    sentCertificateData();
    setIsEditing(false);
  };

  console.log("Editing Value",isEditing);

  const sentCertificateData = async () => {
    try {
      const token = localStorage.getItem("token");
      const body = {title,organization};
      const response = await axios.put(
        "/api/add/updateskill",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Skill added Successfully", response.data);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  

  return (
    <div className="mt-4 flex items-center rounded-[50.667px] border-2 border-solid border-gray-300 dark:border-gray-300 bg-white p-4">
      <CertificationSvg />
      <div className="flex-1">
        <h1 className="text-custom4 text-center text-lg">{props.title}</h1>
        <p className="text-custom4 text-center">{props.organization}</p>
      </div>
      
    </div>
  );
};

export default CertificationCourse;
