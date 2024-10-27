import axios from "axios";

const baseUrl = `${process.env.REACT_APP_BACKEND_URL || "http://localhost:3001"}/image`;

const getImagesByPage = (page = 1) => {
  return axios.get(`${baseUrl}?page=${page}`).then((response) => response.data);
};

const getUserImagesByPage = (page = 1, userId) => {
  return axios
    .get(`${baseUrl}?page=${page}&userId=${userId}`)
    .then((response) => response.data);
};

const getImage = (id) => {
  return axios
    .get(`${baseUrl}/${id}`, { withCredentials: true })
    .then((response) => response.data);
};

const getCommentsByPage = (imageId, parentCommentId, page) => {
  return axios
    .get(
      `${baseUrl}/${imageId}/comments?parentCommentId=${parentCommentId}&page=${page}`,
      { withCredentials: true },
    )
    .then((response) => response.data);
};

const postImage = (title, description, file) => {
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
      },
    )
    .then((response) => response.data);
};

const postComment = (detail, imageId, parentCommentId) => {
  return axios
    .post(
      `${baseUrl}/${imageId}/comment`,
      {
        detail,
        parentCommentId,
      },
      {
        withCredentials: true,
      },
    )
    .then((response) => response.data);
};

const postLikeImage = (imageId) => {
  return axios
    .post(
      `${baseUrl}/${imageId}/like`,
      {},
      {
        withCredentials: true,
      },
    )
    .then((response) => response.data);
};

const postLikeComment = (imageId, commentId) => {
  return axios
    .post(
      `${baseUrl}/${imageId}/comment/${commentId}/like`,
      {},
      {
        withCredentials: true,
      },
    )
    .then((response) => response.data);
};

const putComment = (detail, imageId, commentId) => {
  return axios
    .patch(
      `${baseUrl}/${imageId}/comment/${commentId}`,
      { detail },
      { withCredentials: true },
    )
    .then((response) => response.data);
};

const deleteComment = (imageId, commentId) => {
  return axios
    .delete(`${baseUrl}/${imageId}/comment/${commentId}`, {
      withCredentials: true,
    })
    .then((response) => response.data);
};

const imageServices = {
  getImagesByPage,
  getUserImagesByPage,
  getImage,
  getCommentsByPage,
  postImage,
  postComment,
  putComment,
  postLikeImage,
  postLikeComment,
  deleteComment,
};

export default imageServices;
