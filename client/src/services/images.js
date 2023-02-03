import axios from "axios";

const baseUrl = "http://localhost:3001/image";

const getAll = (page = 1) => {
  return axios.get(`${baseUrl}?page=${page}`).then((response) => response.data);
};

const getOne = (id) => {
  return axios.get(`${baseUrl}/${id}`).then((response) => response.data);
};

const getUserLiked = (id) => {
  return axios
    .get(`${baseUrl}/${id}/userLiked`, {
      withCredentials: true,
    })
    .then((response) => response.data);
};

const getComments = (imageId, parentCommentId, page, previousLength) => {
  return axios
    .get(
      `${baseUrl}/${imageId}/comments?parentCommentId=${parentCommentId}&page=${page}&previousLength=${previousLength}`
    )
    .then((response) => response.data);
};

const createImage = (title, description, file) => {
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

const createComment = (detail, imageId, parentCommentId) => {
  return axios
    .post(
      `${baseUrl}/${imageId}/comments`,
      {
        detail,
        parentCommentId,
      },
      {
        withCredentials: true,
      }
    )
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
  getUserLiked,
  getComments,
  createImage,
  createComment,
  likeOne,
};

export default imageServices;
