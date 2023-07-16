import axios from "axios";
import User from "../components/User";


const url = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"

const fetchData = async (setUserData) => {
    try {
      const response = await axios.get(url);
      const users = response.data;
      
      const updatedUsers = users.map(user => {
        user.show = true;
        user.isChecked = false;
        user.edit = false;
        return user;
      });
      
      setUserData(updatedUsers);
    } catch (error) {
      console.log(error);
    }
  };

export { fetchData };