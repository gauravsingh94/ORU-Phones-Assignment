"use client";
import { useState } from "react";
import { certificatePopUp } from "@/store/atom";
import { educationSelector } from "@/store/selector";
import {  useRecoilValue } from "recoil";
import axios from "axios";
import Educations from "./Educations";


const Education = () => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [yearOfWork, setyearOfWork] = useState("");
  const [collegeName, setcollegeName] = useState("");
  const [collegeDetails, setcollegeDetails] = useState("");
  const EducationData = useRecoilValue(educationSelector);


  const handleSave = () => {
    sentEducationData();
    setIsEditing(false);
  };

  const sentEducationData = async () => {
    try {
      const token = localStorage.getItem("token");
      const body = { title, yearOfWork,collegeName,collegeDetails };
      const response = await axios.put(
        "/api/add/updateeducation",
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

  const handleEditClick = () => {
    setIsEditing(true); 
  };

  return (
    <div className="bg-white p-4">
      <div className="flex justify-between">
        <h1 className="text-gray-900  font-Outfit text-lg font-medium">
          Education
        </h1>
        <button onClick={handleEditClick} className="hidden lg:flex  items-center justify-center w-[100.889px] py-[4.444px] px-[13.778px] rounded-[64.587px] bg-custom1 text-gray-900">
          Edit
        </button>
      </div>

      {EducationData && EducationData.length>0?(
        EducationData.map((val,index)=>(
          <div key={index}>
        <Educations collageName={val.title} yearOfWork={val.yearOfWork} courseName={val.collegeName} collageDescription ={val.collegeDetails} />
      </div>
        ))
      ):(
        <div>
          <h1 className="text-gray-700 font-Outfit text-[15px] font-medium">
            No education added.
          </h1>
        </div>
      )}
      
      
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 text-black">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-gray-900 font-semibold mb-2">
              Edit Certificate
            </h2>
            <input
              type="text"
              placeholder="Collage Name"
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Year yy-yy"
              onChange={(e) => setyearOfWork(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Course Name"
              onChange={(e) => setcollegeName(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Some Description"
              onChange={(e) => setcollegeDetails(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={() => handleSave()}
              className="bg-custom1 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Education;
