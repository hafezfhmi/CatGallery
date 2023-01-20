import axios from "axios";

const baseUrl = "http://localhost:3001/comment";

const getAll = (imageId) => {
  return axios.get(`${baseUrl}/${imageId}`).then((response) => response.data);
};

const create = (detail, imageId, parentCommentId) => {
  return axios
    .post(
      baseUrl,
      {
        detail,
        imageId,
        parentCommentId,
      },
      {
        withCredentials: true,
      }
    )
    .then((response) => response.data);
};

const commentService = {
  getAll,
  create,
};

export default commentService;
