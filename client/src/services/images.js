import axios from "axios";

const baseUrl = "http://localhost:3001/image";

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

const imageService = {
  create,
};

export default imageService;
