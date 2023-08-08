import axios from "axios";

const baseUrl = "http://localhost:3001/user";

const getUser = (id) => {
  return axios.get(`${baseUrl}/${id}`).then((response) => response.data);
};

// update service ✅✅

const updateUser = (data) => {
  return axios
    .patch(`${baseUrl}/${data.userId}`, data, { withCredentials: true })
    .then((res) => console.log(res.data));
};

const userServices = {
  getUser,
  updateUser,
};

export default userServices;
