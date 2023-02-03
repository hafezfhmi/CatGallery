import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineExpandAlt } from "react-icons/ai";
import NestedComment from "../NestedComment";
import Replies from "../Replies";
import person from "../../assets/person-1.jpg";
import styles from "./comment.module.css";

const Comment = ({ comment, level }) => {
  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className={styles.comment}>
      {show ? (
        <span onClick={handleShow}></span>
      ) : (
        <AiOutlineExpandAlt onClick={handleShow} />
      )}

      <div className={styles.commentWrapper}>
        <Link
          to={`/user/${comment.user.id}`}
          className={styles.commentUser + " " + (show && styles.helperMB)}
        >
          <img src={comment.user?.userProfile || person} alt="" />
          {comment.user.username}
        </Link>

        {show && (
          <div className={styles.commentDetail}>
            <p>{comment.detail}</p>
            <Replies
              imageId={comment.imageId}
              parentCommentId={level < 3 ? comment.id : comment.parentCommentId}
            />
          </div>
        )}

        {level + 1 <= 3 && (
          <div className={!show ? styles.helperHide : ""}>
            <NestedComment
              imageId={comment.imageId}
              parentCommentId={comment.id}
              passedComment={comment.comments}
              level={level + 1}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
