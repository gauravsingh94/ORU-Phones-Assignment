import StarSvg from "../../public/Stars";

const ProfessionalDetail = () => {
  return (
    <div className="rounded-lg border-2 border-solid border-gray-300 bg-white shadow-md px-4 py-5 ">
      <div className="flex justify-between">
        <div>
          <h1 className="text-gray-900  font-Outfit text-lg font-medium">
            Professional Details
          </h1>
          <p className="text-custom4">
            This are the professional details shown to users in the app.
          </p>
        </div>
        <div>
          <StarSvg />
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetail;
