import { useState, useEffect, useRef } from "react";
import imageServices from "../services/images";

const useComment = ({ imageId, commentId, level, passedComment = [] }) => {
  const [comments, setComments] = useState([...passedComment]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(
    passedComment.length > 5 ? true : false
  );

  const newComments = useRef([]);

  // fetch comments when component load, page state update
  useEffect(() => {
    let ignore = false;
    const fetchComments = async () => {
      try {
        let fetchedComments = await imageServices.getCommentsByPage(
          imageId,
          commentId,
          page
        );

        // Check if the newly fetched comments is a duplicate of newly submitted comment, if so, remove it from the fetchedComments
        fetchedComments = fetchedComments.filter((fetchedComment) => {
          for (let i = 0; i < newComments.current.length; i++) {
            if (newComments.current[i].id === fetchedComment.id) {
              return false;
            }
          }

          return true;
        });

        if (!ignore) {
          setComments((prev) => [...prev, ...fetchedComments]);
          if (fetchedComments.length > 5) {
            sethasMore(true);
          } else {
            sethasMore(false);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (level === 1 || (level > 1 && page > 1)) fetchComments();

    return () => {
      ignore = true;
    };
  }, [imageId, level, page, commentId]);

  // show more comment by incrementing page, causing useEffect to fetch based on page
  const handleShowMoreComment = () => {
    setPage((prev) => prev + 1);
  };

  const handleSubmitReply = async (reply) => {
    let newComment = await imageServices.postComment(reply, imageId, commentId);

    newComments.current.push(newComment);
    if (level === 3) {
      setComments((prev) => [...prev, newComment]);
    } else {
      setComments((prev) => [newComment, ...prev]);
    }
  };

  const handleUpdate = async (commentId, newComment) => {
    // Update in db
    let updatedComment = await imageServices.putComment(
      newComment,
      imageId,
      commentId
    );

    // Replace the comment with the new updated value from db
    setComments((prev) => {
      return prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              detail: updatedComment.detail,
              updatedAt: updatedComment.updatedAt,
            }
          : comment
      );
    });
  };

  const handleLike = async (commentId) => {
    await imageServices.postLikeComment(imageId, commentId);

    setComments((prev) => {
      return prev.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            userLiked: !comment.userLiked,
            likeCount: comment.userLiked
              ? comment.likeCount - 1
              : comment.likeCount + 1,
          };
        }

        return comment;
      });
    });
  };

  const handleDelete = async (commentId) => {
    // Delete in db
    await imageServices.deleteComment(imageId, commentId);

    // Remove from state
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  return {
    comments,
    level,
    hasMore,
    handleShowMoreComment,
    handleSubmitReply,
    handleUpdate,
    handleLike,
    handleDelete,
  };
};

export default useComment;
