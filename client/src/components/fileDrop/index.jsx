import React, { useRef } from "react";
import { BiUpload } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
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
      {fileDrop.value.imageUrl ? (
        <div className={styles.imageWrapper}>
          <AiOutlineClose
            className={styles.close}
            onClick={fileDrop.clearImage}
          />
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img src={fileDrop.value.imageUrl} />
        </div>
      ) : (
        <div className={styles.fileDropWrapperBorder}>
          <input type="file" ref={inputRef} {...fileDrop.inputDrop} />
          <BiUpload className={styles.uploadIcon} />
          <p>Drag and drop your image here</p>
        </div>
      )}
    </div>
  );
};

export default FileDrop;
