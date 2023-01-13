import React from "react";
import axios from "axios";
import { useField } from "../../hooks/index";
import styles from "./imageUploadForm.module.css";
import FileDrop from "../fileDrop";
import { useFileDrop } from "../../hooks/index";

const ImageUploadForm = () => {
  const title = useField("text", "title");
  const description = useField("", "description");
  const fileDrop = useFileDrop();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3001/image",
        {
          title: title.attributes.value,
          description: description.attributes.value,
          file: fileDrop.value,
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
    <form className={styles.ImageUpload} onSubmit={handleSubmit}>
      <FileDrop fileDrop={fileDrop} />
      <img src={fileDrop.value} alt="test" />
      <input {...title.attributes} />
      <textarea {...description.attributes} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUploadForm;
