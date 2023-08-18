"use client";
import { useState } from "react";
import axios from "axios";
import Experiences from "./Experiences";
import { experienceSelector } from "@/store/selector";
import { useRecoilValue } from "recoil";

const Experience = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setcompanyName] = useState("");
  const [position, setposition] = useState("");
  const [yearOfWork, setyearOfWork] = useState("");
  const [type, settype] = useState("");
  const [companyImage, setcompanyImage] = useState("");

  const ExperiencesArray = useRecoilValue(experienceSelector);

  const handleSave = () => {
    sentExperienceData();
    setIsEditing(false);
  };

  const handePartTime = () => {
    settype("part-time");
  };
  const handeFullTime = () => {
    settype("full-time");
  };

  const sentExperienceData = async () => {
    try {
      const token = localStorage.getItem("token");
      const body = { companyName, position, yearOfWork, type, companyImage };
      const response = await axios.put(
        "/api/add/updateexperience",
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
          Experience
        </h1>
        <button
          onClick={handleEditClick}
          className="hidden lg:flex  items-center justify-center w-[100.889px] py-[4.444px] px-[13.778px] rounded-[64.587px] bg-custom1 text-gray-900"
        >
          Edit
        </button>
      </div>
      {ExperiencesArray && ExperiencesArray.length > 0 ? (
        ExperiencesArray.map((val, index) => (
          <div key={index}>
            <Experiences companyName={val.companyName} position={val.position} yearOfWork={val.yearOfWork} type={val.type} companyImage={val.companyImage} />
          </div>
        ))
      ) : (
        <div>
          <h1 className="text-gray-700 font-Outfit text-[15px] font-medium">
            No Experiences added.
          </h1>
        </div>
      )}

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 text-black">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-gray-900 font-semibold mb-2">
              Edit Experience
            </h2>
            <input
              type="text"
              placeholder="Company Name"
              onChange={(e) => setcompanyName(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Position."
              onChange={(e) => setposition(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="yearOfWork yy-yy"
              onChange={(e) => setyearOfWork(e.target.value)}
              className="border p-2 w-full mb-2"
            />

            <div className="flex">
              <button
                onClick={() => handePartTime()}
                className="bg-purple-300 text-white px-4 py-2 rounded-md mr-2 mb-2"
              >
                Part Time
              </button>
              <button
                onClick={() => handePartTime()}
                className="bg-purple-300 text-white px-4 py-2 rounded-md mb-2"
              >
                Full Time
              </button>
            </div>
            <input
              type="text"
              placeholder="paste company image link"
              onChange={(e) => setcompanyImage(e.target.value)}
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

export default Experience;
