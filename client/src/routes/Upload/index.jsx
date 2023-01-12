import React from "react";
import styles from "./upload.module.css";
import ImageUpload from "../../components/ImageUpload";

const Upload = () => {
  return (
    <div className={styles.upload}>
      <ImageUpload />
    </div>
  );
};

export default Upload;
