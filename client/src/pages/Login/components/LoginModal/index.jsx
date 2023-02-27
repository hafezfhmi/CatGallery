import reactDom from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./loginModal.module.css";
import LoginForm from "../LoginForm";

const LoginModal = ({ unshowLogin }) => {
  const disableParentEvent = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {reactDom.createPortal(
        <div className={styles.loginModal} onClick={unshowLogin}>
          <div className={styles.card} onClick={disableParentEvent}>
            <AiOutlineClose className={styles.close} onClick={unshowLogin} />
            <LoginForm disableError={unshowLogin} />
          </div>
        </div>,
        document.getElementById("errorModal")
      )}
    </>
  );
};

export default LoginModal;
