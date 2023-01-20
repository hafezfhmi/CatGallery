import React from "react";
import styles from "./displayImage.module.css";

const DisplayImage = ({ imageUrl }) => {
  return (
    <div className={styles.displayImage}>
      <img src={imageUrl} alt="" className={styles.image} />
    </div>
  );
};

export default DisplayImage;
