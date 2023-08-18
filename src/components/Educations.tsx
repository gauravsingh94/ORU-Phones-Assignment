import React from "react";

 interface EducationType {
  collageName: string;
  yearOfWork: string;
  courseName: string;
  collageDescription: string;
}

const Educations = (props:EducationType) => {
  return (
    <div className="rounded-lg border-2 border-solid mt-4 border-gray-300 bg-white shadow-md p-4">
      <div>
        <h1 className="text-custom3 mb-4 font-Outfit text-[20px] font-medium">
          {props.collageName}
        </h1>
      </div>
      <div className="flex justify-between mb-4">
        <h1 className="text-gray-900 mr-5 font-Outfit text-lg font-medium">
          ({props.yearOfWork})
        </h1>
        <h1 className="text-gray-900 mr-5 font-Outfit text-lg font-medium">
          {props.courseName}
        </h1>
      </div>
      <p className="text-custom4">
        {props.collageDescription}
      </p>
    </div>
  );
};

export default Educations;
