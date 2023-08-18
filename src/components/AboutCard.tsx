"use client"
import { useState } from 'react';
import { nameSelector } from '@/store/selector';
import { useRecoilValue} from 'recoil';
import { aboutSelector } from '@/store/selector';
import axios from 'axios';

const AboutCard = () => {
  const name = useRecoilValue(nameSelector);
  const [isEditing, setIsEditing] = useState(false); 
  const [about,setAbout] = useState("");
  const About = useRecoilValue(aboutSelector);

  const handleSave = ()=>{
    sentAboutData();
    setIsEditing(false);
  }

  const sentAboutData = async()=>{
    try {
      const token = localStorage.getItem('token'); 
      const body = {about};
      const response = await axios.put('/api/add/updateabout',body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log(response.data); 
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
  const handleEditClick = () => {
    setIsEditing(true); 
  };

  


  return (
    <div className="rounded-md border-2 border-solid border-gray-300 shadow-md bg-white px-4 py-5">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="mr-1">
            <h1 className="text-gray-900 font-Outfit text-[20px] font-medium">
              About
            </h1>
          </div>
          <h1 className="text-custom3 font-Outfit text-[20px] font-medium">
            {name}
          </h1>
        </div>
        <button
          onClick={handleEditClick}
          className="hidden lg:flex items-center justify-center w-[100.889px] py-[4.444px] px-[13.778px] rounded-[64.587px] bg-custom1 text-gray-900"
        >
          Edit
        </button>
      </div>

      <p className="font-Outfit font-nums mt-4 text-[15.667px] font-normal leading-normal text-gray-500">
       {About}
      </p>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 text-black">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-gray-900 font-semibold mb-2">Edit About</h2>
            <input
              type="text"
              placeholder="add about"
              onChange={(e)=>setAbout(e.target.value)}
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

export default AboutCard;
