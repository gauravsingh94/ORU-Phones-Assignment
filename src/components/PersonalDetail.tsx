"use client";
import { personalDetailSelector } from "@/store/selector";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import { sentNameData,sentEmailData,sentPhoneData } from "@/fetch/fetchData";

const PersonalDetail = () => {
  const data = useRecoilValue(personalDetailSelector);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setphoneNo] = useState("");

  const handleNameSave = () => {
    sentNameData(name);
    setIsEditingName(false);
  };

  const handleEmailSave = () => {
    sentEmailData(email);
    setIsEditingEmail(false);
  };

  const handlePhoneSave = () => {
    sentPhoneData(phoneNo);
    setIsEditingPhone(false);
  };

  

  const handleEditClickName = () => {
    setIsEditingName(true); 
  };  
  const handleEditClickEmail = () => {
    setIsEditingEmail(true); 
  };  
  const handleEditClickPhone = () => {
    setIsEditingPhone(true); 
  };  
  return (
    <div className="rounded-md border-2 border-solid border-gray-300 shadow-md bg-white px-4 py-5 ">
      <div className="mb-2">
        <h1 className="text-gray-700 dark:text-gray-400 font-Outfit text-lg font-medium">
          Your Name
        </h1>
        <div className="flex justify-between">
          <h1 className="text-gray-900 font-Outfit text-lg font-medium">
            {data.name}
          </h1>
          <button onClick={handleEditClickName } className="hidden lg:flex  items-center justify-center w-[100.889px] py-[4.444px] px-[13.778px] rounded-[64.587px] bg-custom1 text-gray-900">
            Edit
          </button>
        </div>
      </div>

      <div className="mb-2">
        <h1 className="text-gray-700 dark:text-gray-400 font-Outfit text-lg font-medium">
          Email
        </h1>
        <div className="flex justify-between">
          <h1 className="text-gray-900 font-Outfit text-lg font-medium">
            {data.email}
          </h1>
          <button onClick={handleEditClickEmail} className="hidden lg:flex  items-center justify-center w-[100.889px] py-[4.444px] px-[13.778px] rounded-[64.587px] bg-custom1 text-gray-900">
            Edit
          </button>
        </div>
      </div>

      <div className="mb-2">
        <h1 className="text-gray-700 dark:text-gray-400 font-Outfit text-lg font-medium">
          Phone Number
        </h1>
        <div className="flex justify-between">
          <h1 className="text-gray-900 font-Outfit text-lg font-medium">
            {data.phoneNo}
          </h1>
          <button onClick={handleEditClickPhone} className="hidden lg:flex items-center justify-center w-[100.889px] py-[4.444px] px-[13.778px] rounded-[64.587px] bg-custom1 text-gray-900">
            Edit
          </button>
        </div>
      </div>
      {isEditingName && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 text-black">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 onClick={handleEditClickPhone} className="text-gray-900 font-semibold mb-2">
              Edit Name
            </h2>
            <input
              type="text"
              placeholder="New Name"
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={() => handleNameSave()}
              className="bg-custom1 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      )}

{isEditingEmail && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 text-black">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-gray-900 font-semibold mb-2">
              Edit Email
            </h2>
            <input
              type="text"
              placeholder="New Email"
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={() => handleEmailSave()}
              className="bg-custom1 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {isEditingPhone&& (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 text-black">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-gray-900 font-semibold mb-2">
              Edit Password
            </h2>
            <input
              type="text"
              placeholder="New Phone No"
              onChange={(e) => setphoneNo(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={() => handlePhoneSave()}
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

export default PersonalDetail;
