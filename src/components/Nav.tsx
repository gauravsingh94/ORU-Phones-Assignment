import MenuIconSvg from "../../public/menuIcon";
import NotificationSvg from "../../public/Notification";
import ProfileSvg from "../../public/Ellipse 255";
import DownSvg from "../../public/Down";
import { pannelOpen } from "@/store/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { nameSelector } from "@/store/selector";
import { profilePhotoSelector } from "@/store/selector";
import { personalDetailData } from "@/store/atom";

const Nav = () => {
  const [isPannelOpen, setPannelOpen] = useRecoilState(pannelOpen);
  const name = useRecoilValue(nameSelector);
  const newProfilePhoto = useRecoilValue(profilePhotoSelector);

  console.log("Profile photo from nav bar",profilePhotoSelector);

  const handleClick = () => {
    setPannelOpen(!isPannelOpen);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 h-14 lg:h-20 flex flex-shrink-0 items-center p-4 lg:p11 bg-white justify-between border-b-2 ">
      <div className="items-center flex gap-[7px] lg:hidden">
        <button onClick={handleClick}>
          <MenuIconSvg />
        </button>
        <img src="/companyLogo.png" alt="" />
      </div>
      <button
        className="hidden lg:flex  border-[1px] border-solid rounded-[8.889px] border-var[--input-box-stroke-thin] shadow-md px-[34px] py-[9px]  "
        onClick={handleClick}
      >
        <h1 className="text-black">Dashboard</h1>
      </button>
      <div className="flex items-center gap-4">
        <NotificationSvg />
        <div className="lg:hidden">
          {newProfilePhoto && newProfilePhoto.length>1 ? (
          <div className="w-[26px] h-[27px] rounded-full overflow-hidden">
            <img src={newProfilePhoto} alt="" />{" "}
          </div>
        ) : (
          <>
            <ProfileSvg width={26} height={27} />
          </>
        )}
        </div>
        <div className="hidden lg:flex h-[54.249px] p-[10.236px 8.189px] items-center gap-[10.236px] flex-1 flex-shrink-0 rounded-[8.189px] border-[1.024px] border-#E8EFF7 bg-[rgba(255, 255, 255, 0.50)]">
          <div className="ml-4">
          {newProfilePhoto && newProfilePhoto.length>1 ? (
          <div className="w-[34px] h-[34px] rounded-full overflow-hidden">
            <img src={newProfilePhoto} alt="" />{" "}
          </div>
        ) : (
          <>
            <ProfileSvg width={34} height={34} />
          </>
        )}
          </div>
          <div>
            <h1 className="text-custom1 font-poppins text-[10.236px]">
              Welcome back,
            </h1>
            <h1 className="text-custom1 font-poppins text-[18]">
              {name}
            </h1>
          </div>
          <div className="mr-4">
            <DownSvg />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
