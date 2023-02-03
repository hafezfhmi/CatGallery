import React, { useState, useEffect } from "react";
import imageService from "../../services/images";
import Comment from "../Comment";
import styles from "./comments.module.css";

const Comments = ({
  imageId,
  parentCommentId = null,
  passedComment = [],
  level = 1,
}) => {
  const [comments, setComments] = useState(passedComment);
  const [page, setPage] = useState(1);
  const [moreComments, setMoreComments] = useState(
    passedComment.length > 0 ? true : false
  );

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await imageService.getComments(
          imageId,
          parentCommentId,
          page,
          comments.length
        );

        if (fetchedComments.length > 0) {
          setComments((prev) => [...prev, ...fetchedComments]);
          setMoreComments(true);
        } else {
          setMoreComments(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (comments.length < 5 || page > 1) {
      fetchComments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageId, page, parentCommentId]);

  const handleShowMoreComment = () => {
    setPage((prev) => prev + 1);
  };

  if (comments.length === 0 && level === 1) {
    return <div>No comments</div>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <Comment comment={comment} level={level} key={comment.id} />
      ))}

      {moreComments && (
        <div className={styles.loadMore} onClick={handleShowMoreComment}>
          Load more comments
        </div>
      )}
    </div>
  );
};

export default Comments;
