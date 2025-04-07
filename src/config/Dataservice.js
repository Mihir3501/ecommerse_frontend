import axios from "axios";
import { API } from "./Api";

const API_ENDPOINT = "http://localhost:5000";

const DataServices = (token) => {
  return axios.create({
    baseURL: API_ENDPOINT,
    headers: {
      "Content-Type": "application/json",
      authorization: token ? token : "",  
    },
  }); 
};

export const loginAdmin = (data) => DataServices().post(API.ADMINLOGIN, data);

export const userSignup = (data) => DataServices().post(API.USERSIGNUP, data);





export default DataServices;
