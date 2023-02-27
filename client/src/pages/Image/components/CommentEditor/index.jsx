import { useRef, useEffect } from "react";
import useError from "../../../../hooks/useError";
import useField from "../../../../hooks/useField";
import useLoginModal from "../../../../hooks/useLoginModal";
import LoginModal from "../../../Login/components/LoginModal";
import ErrorModal from "../../../../components/ErrorModal";
import Button from "../../../../components/Button";
import styles from "./commentEditor.module.css";

const CommentEditor = ({
  handleSubmit,
  handleCloseEditor = null,
  defaultValue = "",
}) => {
  const editor = useField("text", "editor", defaultValue);
  const error = useError();
  const loginChecker = useLoginModal();
  const inputRef = useRef();

  useEffect(() => {
    if (handleCloseEditor) {
      inputRef.current.focus();
    }
  }, [handleCloseEditor]);

  const handleOnSubmitEditor = async (e) => {
    e.preventDefault();

    loginChecker.checkLogin();
    if (!loginChecker.isLoggedIn) {
      return;
    }

    try {
      await handleSubmit(editor.attributes.value);

      if (handleCloseEditor) {
        handleCloseEditor(e);
      } else {
        editor.reset();
      }
    } catch (err) {
      error.handleError(true, err?.response?.data?.message || err.message);
    }
  };

  return (
    <>
      {error.error && (
        <ErrorModal
          errorMsg={error.errorMsg}
          disableError={error.disableError}
        />
      )}

      {loginChecker.showLogin && (
        <LoginModal unshowLogin={loginChecker.disableLoginModal} />
      )}

      <form onSubmit={handleOnSubmitEditor} className={styles.editor}>
        <textarea {...editor.attributes} ref={inputRef} />

        <div className={styles.buttonWrapper}>
          {handleCloseEditor && (
            <Button
              label="Cancel"
              onClick={handleCloseEditor}
              style={{ backgroundColor: "#caddf6", color: "#000" }}
            />
          )}

          <Button
            label="Submit"
            disabled={editor.attributes.value.length ? false : true}
          />
        </div>
      </form>
    </>
  );
};

export default CommentEditor;
