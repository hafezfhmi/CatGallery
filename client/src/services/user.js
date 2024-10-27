import axios from "axios";

const baseUrl = `${process.env.REACT_APP_BACKEND_URL || "http://localhost:3001"}/user`;

const getUser = (id) => {
  return axios.get(`${baseUrl}/${id}`).then((response) => response.data);
};

const userServices = {
  getUser,
};

export default userServices;
