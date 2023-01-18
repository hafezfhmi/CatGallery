import axios from "axios";

const baseUrl = "http://localhost:3001/image";

const getAll = (page = 1) => {
  return axios.get(`${baseUrl}?page=${page}`).then((response) => response.data);
};

const create = (title, description, file) => {
  return axios
    .post(
      baseUrl,
      {
        title,
        description,
        file,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((response) => response.data);
};

const imageServices = { getAll, create };

export default imageServices;
