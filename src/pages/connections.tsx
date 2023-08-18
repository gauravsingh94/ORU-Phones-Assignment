"use client";
import PurpleTopCard from "@/components/PurpleTopCard";
import PeopleConnectionCard from "@/components/PeopleConnectionCard";
import PeopleSuggestionCard from "@/components/PeopleSuggestionCard";
import Nav from "@/components/Nav";
import SidePannel from "@/components/SidePannel";
import axios from "axios";
import { PersonalDetailType,ConnectionDetailType } from "@/store/atom";
import { useEffect, useState } from "react";
import { connectionsSelector } from "@/store/selector";
import { useRecoilValue } from "recoil";

const Connections = () => {
  const [suggestedUser, setSuggestedUser] = useState<PersonalDetailType[]>([]);
  const [mycoonection, setMyconnection] = useState<ConnectionDetailType[]>([]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "/api/connections/similarconnection",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuggestedUser(response.data.suggestedConnections);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchMyConnectionData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "/api/connections/mycoonection",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMyconnection(response.data.connections);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchMyConnectionData();
  }, []);

  return (
    <>
      <Nav />
      <SidePannel />
      <div className="mt-[70px] lg:mt-24 px-4 mb-10">
        <PurpleTopCard />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-5 ">
          {mycoonection && mycoonection.length > 0 ? (
            mycoonection.map((val, index) => (
              <div key={index}>
                <PeopleConnectionCard
                _id={val.userId}
                  name={val.name}
                  about={val.about}
                  profilePhoto={val.profilePhoto}
                />
              </div>
            ))
          ) : (
            <div>
              <h1 className="text-custom4 font-poppins text-[25px] lg:text-[30px]">
                No Suggestion available.
              </h1>
            </div>
          )}
        </div>

        <div className="mt-[100px] ">
          <h1 className="text-custom4 font-poppins text-[25px] lg:text-[30px]">
            People you can also connect.
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-5 ">
          {suggestedUser && suggestedUser.length > 0 ? (
            suggestedUser.map((val, index) => (
              <div key={index}>
                <PeopleSuggestionCard
                  _id={val._id}
                  name={val.name}
                  about={val.about}
                  profilePhoto={val.profilePhoto}
                />
              </div>
            ))
          ) : (
            <div>
              <h1 className="text-custom4 font-poppins text-[25px] lg:text-[30px]">
                No Suggestion available.
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Connections;
