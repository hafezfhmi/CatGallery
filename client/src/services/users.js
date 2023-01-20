import axios from "axios";

const baseUrl = "http://localhost:3001/user";

const getOne = (id) => {
  return axios.get(`${baseUrl}/${id}`).then((response) => response.data);
};

const userService = {
  getOne,
};

export default userService;
