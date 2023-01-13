import React from "react";
import styles from "./upload.module.css";
import ImageUploadForm from "../../components/ImageUploadForm";

const Upload = () => {
  return (
    <div className={styles.upload}>
      <ImageUploadForm />
    </div>
  );
};

export default Upload;
