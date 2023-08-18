import ProfileSvg from "../../public/Ellipse 255";
import axios from "axios";

interface PropsType {
  _id?: string;
  name?: string;
  about?: string;
  profilePhoto?: string;
}
const PeopleConnectionCard = (props: PropsType) => {
  const handleConnect = async () => {
    const token = localStorage.getItem("token");
    
    const headers = {
      
      authorization: `Bearer ${token}`,
      _id: props._id
    }
    console.log(headers);
  try {
    const response = await axios.delete(
      "/api/connections/deleteconnection",
      {
        headers
      }
    );
    alert("Connection removed successfully");
    console.log("Connection removed successfully", response.data.message);
  } catch (error) {
    console.error("Error connecting:", error);
    
  }
};

  return (
    <div className="flex justify-between rounded-md border-2 border-solid border-gray-300  shadow-md bg-white px-4 py-5 ">
      <div className="px-2">
        <h1 className="text-gray-600 font-Outfit text-lg font-bold mb-2">
          {props.name}
        </h1>
        <p className="text-custom4 mb-3">{props.about}</p>
        <div className="flex border rounded-[71.247px] bg-custom1 w-[190px] h-[30px] justify-center items-center">
          <button
            onClick={handleConnect}
            className="text-custom1 font-poppins font-bold"
          >
            Remove
          </button>
        </div>
      </div>
      {props.profilePhoto && props.profilePhoto.length > 1 ? (
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
          <img src={props.profilePhoto} alt="" />
        </div>
      ) : (
        <div className="w-[100px] h-[100px]">
          <ProfileSvg width={100} height={100} />
        </div>
      )}
    </div>
  );
};

export default PeopleConnectionCard;
