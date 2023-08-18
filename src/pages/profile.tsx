import ProfileSection from "../components/ProfileSection";
import PersonalDetail from "../components/PersonalDetail";
import AboutCard from "../components/AboutCard";
import SkillCard from "../components/SkillCard";
import ProfessionalDetail from "../components/ProfessionalDetail";
import Certification from "../components/Certification";
import Experience from "../components/Experience";
import Education from "../components/Education";
import axios from "axios";
import { useEffect } from "react";
import { personalDetailData } from "@/store/atom";
import { useSetRecoilState } from "recoil";
import Nav from "@/components/Nav";
import SidePannel from "@/components/SidePannel";


const Profile = () => {
  const setPersonalDetailData = useSetRecoilState(personalDetailData);
  
    const fetchUserData = async () => {
        try {
          const token = localStorage.getItem('token'); 
      
          const response = await axios.get('/api/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          setPersonalDetailData(response.data);
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
      };

      useEffect(()=>{
        fetchUserData();
      },[])
    
  return (
    <>
    <Nav/>
    <SidePannel/>
    <div className="relative mt-24 ">
      <div className="relative rounded-lg border h-[190px] mt-4 border-white border-solid bg-custom2 p-4">
        <h1 className="text-lg">My Profile</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-14 rounded-lg border border-gray-300 border-solid bg-white shadow-md p-4">
          <div className="grid grid-cols-1 mt-10 gap-3">
            <div>
              <ProfileSection />
            </div>
            <div>
              <PersonalDetail />
            </div>
            <div>
              <AboutCard />
            </div>
            <div>
              <SkillCard />
            </div>
          </div>
          <div className="grid grid-cols-1 mt-10 gap-3">
            <div>
              <ProfessionalDetail />
            </div>
            <div>
              <Certification />
            </div>
            <div>
              <Experience />
            </div>
            <div>
              <Education />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default Profile;
