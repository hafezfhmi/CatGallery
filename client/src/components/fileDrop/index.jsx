import React, { useRef } from "react";
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
      <input type="file" ref={inputRef} {...fileDrop.inputDrop} />
      <span>Drop image here</span>
    </div>
  );
};

export default FileDrop;
