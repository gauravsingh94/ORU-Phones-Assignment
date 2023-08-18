"use client";
import { useState } from "react";
import axios from "axios";
import ProfileSvg from "../../public/Ellipse 255";
import { profilePhotoSelector } from "@/store/selector";
import { useRecoilValue } from "recoil";
import { personalDetailData } from "@/store/atom";
const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setprofilePhoto] = useState("");
  const newProfilePhoto = useRecoilValue(profilePhotoSelector);
  
  const handleSave = () => {
    sentProfileData();
    setIsEditing(false);
  };

  const sentProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      const body = { profilePhoto };
      const response = await axios.put(
        "/api/add/updateprofilephoto",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const handleEditClick = () => {
    setIsEditing(true); 
  };

  return (
    <div className=" bg-white  ">
      <div className="hidden lg:flex  items-center justify-between">
        {newProfilePhoto && newProfilePhoto.length>1 ? (
          <div className="w-[90px] h-[90px] rounded-full overflow-hidden">
            <img src={newProfilePhoto} alt="" />{" "}
          </div>
        ) : (
          <>
            <ProfileSvg width={90} height={90} />
          </>
        )}

        <div className="flex border rounded-[71.247px] bg-custom1 w-[150px] h-[40px] justify-center items-center">
          <button
            onClick={handleEditClick}
            className="text-custom1 font-poppins"
          >
            Upload Photo
          </button>
        </div>
      </div>
      <div className="sm:hidden flex text-[10px] items-center justify-between">
      {newProfilePhoto && newProfilePhoto.length>1 ? (
          <div className="w-[71px] h-[71px] rounded-full overflow-hidden">
            <img src={newProfilePhoto} alt="" />{" "}
          </div>
        ) : (
          <>
            <ProfileSvg width={71} height={71} />
          </>
        )}
        <div className="flex border rounded-[71.247px] bg-custom3 w-[100px] h-[30px] justify-center items-center">
          <button
            onClick={handleEditClick}
            className="text-custom1 font-poppins"
          >
            Upload Photo
          </button>
        </div>
      </div>
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 text-black">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-gray-900 font-semibold mb-2">
              Edit Profile Photo
            </h2>
            <input
              type="text"
              placeholder="Add profile photo link"
              onChange={(e) => setprofilePhoto(e.target.value)}
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

export default ProfileSection;
