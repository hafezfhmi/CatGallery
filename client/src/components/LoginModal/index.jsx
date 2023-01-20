import React from "react";
import reactDom from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./loginModal.module.css";

import errorIcon from "../../assets/error.webp";

const LoginModal = ({ errorMsg, disableError }) => {
  const disableParentEvent = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {reactDom.createPortal(
        <div className={styles.errorModal} onClick={disableError}>
          <div className={styles.card} onClick={disableParentEvent}>
            <AiOutlineClose className={styles.close} onClick={disableError} />
            <img src={errorIcon} alt="error icon" />
            <h1>Something went wrong!</h1>
            <p>{errorMsg}</p>
          </div>
        </div>,
        document.getElementById("errorModal")
      )}
    </>
  );
};

export default LoginModal;
