import axios from "axios";

const baseUrl = "http://localhost:3001/image";

const getAll = (page = 1) => {
  return axios.get(`${baseUrl}?page=${page}`).then((response) => response.data);
};

const getOne = (id) => {
  return axios.get(`${baseUrl}/${id}`).then((response) => response.data);
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

const getLikesAmount = (id) => {
  return axios
    .get(`${baseUrl}/${id}/likesAmount`)
    .then((response) => response.data);
};

const getUserLiked = (id) => {
  return axios
    .get(`${baseUrl}/${id}/userLiked`, {
      withCredentials: true,
    })
    .then((response) => response.data);
};

const likeOne = (id) => {
  return axios
    .post(
      `${baseUrl}/likes`,
      { imageId: id },
      {
        withCredentials: true,
      }
    )
    .then((response) => response.data);
};

const imageServices = {
  getAll,
  getOne,
  create,
  getLikesAmount,
  getUserLiked,
  likeOne,
};

export default imageServices;
