import axios from "axios";

export const sentNameData = async (name:string) => {
    try {
      const token = localStorage.getItem("token");
      const body = { name };
      const response = await axios.put(
        "/api/add/updatename",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  export const sentEmailData = async (email:string) => {
    try {
      const token = localStorage.getItem("token");
      const body = { email };
      const response = await axios.put(
        "/api/add/updateemail",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  export const sentPhoneData = async (phoneNo:string) => {
    try {
      const token = localStorage.getItem("token");
      const body = { phoneNo };
      const response = await axios.put(
        "/api/add/updatephoneno",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

