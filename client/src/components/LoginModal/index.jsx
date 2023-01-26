import React from "react";
import reactDom from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./loginModal.module.css";
import LoginForm from "../LoginForm";

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
            <LoginForm redirect={false} disableError={disableError} />
          </div>
        </div>,
        document.getElementById("errorModal")
      )}
    </>
  );
};

export default LoginModal;
