import React, { useState } from "react";
import imageServices from "../../services/images";
import { useField, useError } from "../../hooks/index";
import ErrorModal from "../ErrorModal";
import Button from "../Button";
import styles from "./replies.module.css";

const Replies = ({ imageId, parentCommentId }) => {
  const [showReply, setshowReply] = useState(false);
  const replies = useField("text", "replies");
  const error = useError();

  const handleShowReply = () => {
    setshowReply((prev) => !prev);
  };

  const handleSubmitReplies = async (e) => {
    e.preventDefault();

    try {
      await imageServices.createComment(
        replies.attributes.value,
        imageId,
        parentCommentId
      );
    } catch (err) {
      error.handleError(true, err?.response?.data?.message || err.message);
    }
  };

  if (showReply) {
    return (
      <>
        {error.error && (
          <ErrorModal
            errorMsg={error.errorMsg}
            disableError={error.disableError}
          />
        )}

        <form onSubmit={handleSubmitReplies} className={styles.replies}>
          <textarea {...replies.attributes} />
          <div>
            <Button
              label="Cancel"
              onClick={handleShowReply}
              style={{ backgroundColor: "#caddf6", color: "#000" }}
            />
            <Button label="Submit" />
          </div>
        </form>
      </>
    );
  }

  return (
    <p onClick={handleShowReply} className={styles.reply}>
      Reply
    </p>
  );
};

export default Replies;
