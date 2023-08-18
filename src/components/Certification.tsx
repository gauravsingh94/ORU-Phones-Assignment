"use client";
import { useState } from "react";
import { certificationSelector } from "@/store/selector";
import CertificationCourse from "./CertificationCourse";
import {  useRecoilValue } from "recoil";
import axios from "axios";

const Certification = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const Certificates = useRecoilValue(certificationSelector);

  console.log(Certificates);
  
  const handleSave = () => {
    sentCertificateData();
    setIsEditing(false);
  };


  const sentCertificateData = async () => {
    try {
      const token = localStorage.getItem("token");
      const body = { title, organization };
      const response = await axios.put(
        "/api/add/updatecertification",
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
          Certifications
        </h1>
        <button
          onClick={handleEditClick}
          className="hidden lg:flex  items-center justify-center w-[100.889px] py-[4.444px] px-[13.778px] rounded-[64.587px] bg-custom1 text-gray-900"
        >
          Edit
        </button>
      </div>
      {Certificates && Certificates.length > 0 ? (
        Certificates.map((val, index) => (
          <div key={index}>
            <CertificationCourse
              title={val.title}
              organization={val.organization}
            />
          </div>
        ))
      ) : (
        <div>
          <h1 className="text-gray-700 font-Outfit text-[15px] font-medium">
            No certificates added.
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
              placeholder="Add Title."
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Add Organization."
              onChange={(e) => setOrganization(e.target.value)}
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

export default Certification;
