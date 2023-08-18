interface PropsData {
  companyName: string;
  position: string;
  yearOfWork: string;
  type: string;
  companyImage: string;
}

const Experiences = (props: PropsData) => {
  return (
    <div className="flex rounded-lg border-2 border-solid mt-4 border-gray-300 bg-white shadow-md p-4">
      <div className="flex-1">
        <div className="flex ">
          <h1 className="text-gray-900 mr-5 font-Outfit text-lg font-medium">
            ({props.yearOfWork})
          </h1>
          <h1 className="text-gray-900  font-Outfit text-lg font-medium">
            {props.type}
          </h1>
        </div>
        <div className="flex">
          <p className="text-custom4 mr-5">{props.companyName}</p>
          <p className="text-custom4">{props.position}</p>
        </div>
      </div>
      <div style={{ width: "59px", height: "27px" }}>
        <img src={props.companyImage} alt="" />
      </div>
    </div>
  );
};

export default Experiences;
