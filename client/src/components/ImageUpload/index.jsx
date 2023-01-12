import React, { useState } from "react";
import axios from "axios";
import { useField } from "../../hooks/index";
import styles from "./imageUpload.module.css";

const ImageUpload = () => {
  const [file, setFile] = useState(null);

  const title = useField("text", "title");
  const description = useField("", "description");

  console.log(description.attributes.value);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3001/image",
        {
          title: title.attributes.value,
          description: description.attributes.value,
          file,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit}>
      <input {...title.attributes} />
      <textarea {...description.attributes} />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUpload;
