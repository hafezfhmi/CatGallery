import React, { useRef } from "react";
import { BiUpload } from "react-icons/bi";
import styles from "./fileDrop.module.css";

const FileDrop = ({ fileDrop }) => {
  const inputRef = useRef(null);

  const handleAreaClick = () => {
    inputRef.current.click();
  };

  return (
    <div
      className={styles.fileDrop}
      onClick={handleAreaClick}
      {...fileDrop.areaDrop}
    >
      <div className={styles.fileDropWrapperBorder}>
        <input type="file" ref={inputRef} {...fileDrop.inputDrop} />
        <BiUpload className={styles.uploadIcon} />
        <p>Drag and drop your image here</p>
      </div>
    </div>
  );
};

export default FileDrop;
