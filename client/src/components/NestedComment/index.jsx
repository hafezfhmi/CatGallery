import React, { useState } from "react";
import Comments from "../Comments";
import styles from "./nestedComment.module.css";

const NestedComment = ({ imageId, parentCommentId, passedComment, level }) => {
  const [showReplies, setShowReplies] = useState(false);

  const handleShowReplies = () => {
    setShowReplies(true);
  };

  if (!showReplies) {
    return (
      <p className={styles.showReplies} onClick={handleShowReplies}>
        Show replies
      </p>
    );
  }

  return (
    <div className={styles.nestedComment}>
      <Comments
        imageId={imageId}
        parentCommentId={parentCommentId}
        passedComment={passedComment}
        level={level}
      />
    </div>
  );
};

export default NestedComment;
