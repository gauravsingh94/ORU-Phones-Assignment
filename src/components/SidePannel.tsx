"use client"
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currentSeletedTab, pannelOpen } from "@/store/atom";
import LeftArrowSvg from "../../public/leftArrowSvg";
import { useRouter } from "next/router";

interface Tabs{
    label:string;
    link:string;
  }

const SidePannel = () => {
  const router = useRouter();
  const isPannelOpen = useRecoilValue(pannelOpen);
  const setPannel = useSetRecoilState(pannelOpen);
  const [currentTab, setCurrentTab] = useRecoilState(currentSeletedTab);

  
  const tabs: Tabs[] = [
    { label: "Profile", link: "/profile" },
    { label: "Connections", link: "/connections" },
  ];

  const handleSideTabsClick = (index: number,link:string) => {
    setCurrentTab(index);
    router.push(link);
  };

  const handleLogOut = ()=>{
    localStorage.removeItem('token');
    setPannel(false);
    router.push("/");
  }

  useEffect(() => {
    const currentRoute = router.pathname;
    const matchingTabIndex = tabs.findIndex((tab) => tab.link === currentRoute);
    if (matchingTabIndex !== -1) {
      setCurrentTab(matchingTabIndex);
    }
  }, []);
  
  return (
    <div
      className={`fixed top-[56px] lg:top-[80px] left-0 h-screen w-[250px] lg:w-[300px] flex justify-center bg-white shadow-lg p-4 transform ${
        isPannelOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-[1000]`}
    >
      <div className="flex flex-col w-40">
        <ul>
          {tabs.map((tab, index) => {
            return (
              <li key={index}>
                <div className="flex items-center">
                  <LeftArrowSvg />
                  <a
                    className={`text-custom5 ml-3 px-3 py-2 ${
                      currentTab === index
                        ? "border-2 rounded  border-blue-900"
                        : ""
                    }  text-[20px] lg:text-[25px]`}
                    onClick={() => handleSideTabsClick(index,tab.link)}
                  >
                    {tab.label}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-auto ml-8 mb-20 flex justify-between">
          <button onClick={handleLogOut} className=" text-custom5 text-[20px] lg:text-[25px]">Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default SidePannel;
