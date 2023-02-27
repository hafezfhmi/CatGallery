import reactDom from "react-dom";
import { AiOutlineClose, AiOutlineWarning } from "react-icons/ai";
import styles from "./errorModal.module.css";

const ErrorModal = ({ errorMsg, disableError = null }) => {
  const disableParentEvent = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {reactDom.createPortal(
        <div
          className={styles.errorModal}
          onClick={disableError ? disableError : () => {}}
        >
          <div className={styles.card} onClick={disableParentEvent}>
            {disableError && (
              <AiOutlineClose className={styles.close} onClick={disableError} />
            )}
            <AiOutlineWarning className={styles.warn} />

            <h1>Something went wrong!</h1>
            <p>{errorMsg}</p>
          </div>
        </div>,
        document.getElementById("errorModal")
      )}
    </>
  );
};

export default ErrorModal;
