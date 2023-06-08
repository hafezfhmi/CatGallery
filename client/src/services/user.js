import axios from "axios";

const baseUrl = "http://localhost:3001/user";

const getUser = (id) => {
  return axios.get(`${baseUrl}/${id}`).then((response) => response.data);
};

const userServices = {
  getUser,
};

export default userServices;
