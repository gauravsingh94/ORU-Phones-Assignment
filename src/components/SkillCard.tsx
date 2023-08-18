"use client";
import { useState } from "react";
import { skillsSelector } from "@/store/selector";
import axios from "axios";
import { useRecoilValue } from "recoil";

const SkillCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [skill, setSkill] = useState("");
  const Skill = useRecoilValue(skillsSelector);
  const handleSave = () => {
    sentSkillData();
    setIsEditing(false);
  };

  const sentSkillData = async () => {
    try {
      const token = localStorage.getItem("token");
      const body = { skill };
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

  const handleEditClick = () => {
    setIsEditing(true); 
  };

  return (
    <div className="rounded-md border-2 border-solid border-gray-300  shadow-md bg-white px-4 py-5 ">
      <div className="flex justify-between mb-1">
        <h1 className="text-gray-900 font-Outfit text-[20px] font-medium">
          Skills
        </h1>
        <button
          onClick={handleEditClick}
          className="hidden lg:flex  items-center justify-center w-[100.889px] py-[4.444px] px-[13.778px] rounded-[64.587px] bg-custom1 text-gray-900"
        >
          Edit
        </button>
      </div>
      {Skill && Skill.length > 1 ? (
        Skill.map((val, index) => (
          <div key={index} className="mb-1">
            <h1 className="text-gray-700 font-Outfit text-[15px] font-medium">
              {val}
            </h1>
          </div>
        ))
      ) : (
        <div className="mb-1">
          <h1 className="text-gray-700 font-Outfit text-[15px] font-medium">
            No Skill added.
          </h1>
        </div>
      )}

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 text-black">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-gray-900 font-semibold mb-2">Edit Skill</h2>
            <input
              type="text"
              placeholder="Add Skill."
              onChange={(e) => setSkill(e.target.value)}
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

export default SkillCard;
