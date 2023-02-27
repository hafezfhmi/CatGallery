import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { AiOutlineExpandAlt } from "react-icons/ai";
import useComment from "../../../../hooks/useComment";
import useError from "../../../../hooks/useError";
import useLoginModal from "../../../../hooks/useLoginModal";
import { useImageDetailContext } from "../../../../context/imageDetailContext";
import { useUserContext } from "../../../../context/userContext";
import { timeFromNow } from "../../../../utils/timezone";
import styles from "./comment.module.css";
import CommentEditor from "../CommentEditor";
import CommentsContainer from "../CommentsContainer";
import Button from "../../../../components/Button";
import ErrorModal from "../../../../components/ErrorModal";
import LoginModal from "../../../Login/components/LoginModal";
import person from "../../../../assets/person-1.jpg";

const Comment = ({ comment, commentHooks, level }) => {
  const [showComment, setShowComment] = useState(true);
  const [showReply, setShowReply] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const childCommentHooks = useComment({
    imageId: comment.imageId,
    commentId: comment.id,
    level: level + 1,
    passedComment: comment.comments,
  });
  const error = useError();
  const loginChecker = useLoginModal();
  const imageDetailCtx = useImageDetailContext();
  const userCtx = useUserContext();

  const commentTimeFromNow = timeFromNow(comment.createdAt);
  const commentEdited = comment.createdAt !== comment.updatedAt;
  const isFromCreator = imageDetailCtx.imageCreatorId === comment.user.id;
  const isFromCommentAuthor = userCtx.user
    ? userCtx.user.id === comment.user.id
    : false;
  const actionButtonStyle = {
    backgroundColor: "transparent",
    color: "#878a8c",
    padding: "0",
    fontSize: "0.9rem",
    fontWeight: "500",
  };
  const actionButtonStyleLiked = {
    ...actionButtonStyle,
    color: "rgb(39, 123, 234)",
  };

  const handleToggleComment = () => {
    setShowComment((prev) => !prev);
  };

  // useCallback because we will pass this function to CommentEditor.
  // When commentList is updated, we don't want to recreate this function because it will cause the editor refocus on load more comments.
  const handleToggleReply = useCallback((e) => {
    e.preventDefault();

    loginChecker.checkLogin();
    if (!loginChecker.isLoggedIn) {
      return;
    }

    setShowReply((prev) => !prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleEdit = useCallback((e) => {
    e.preventDefault();

    setShowEdit((prev) => !prev);
  }, []);

  const handleUpdateComment = async (newComment) => {
    await commentHooks.handleUpdate(comment.id, newComment);
  };

  const handleLikeComment = async () => {
    loginChecker.checkLogin();
    if (!loginChecker.isLoggedIn) {
      return;
    }

    try {
      await commentHooks.handleLike(comment.id);
    } catch (err) {
      error.handleError(true, err?.response?.data?.message || err.message);
    }
  };

  const handleDeleteComment = async () => {
    try {
      await commentHooks.handleDelete(comment.id);
    } catch (err) {
      error.handleError(true, err?.response?.data?.message || err.message);
    }
  };

  return (
    <div className={styles.comment}>
      {loginChecker.showLogin && (
        <LoginModal unshowLogin={loginChecker.disableLoginModal} />
      )}

      {error.error && (
        <ErrorModal
          errorMsg={error.errorMsg}
          disableError={error.disableError}
        />
      )}

      {showComment ? (
        <span onClick={handleToggleComment}></span>
      ) : (
        <AiOutlineExpandAlt onClick={handleToggleComment} />
      )}

      <div className={styles.commentWrapper}>
        <div className={showComment ? styles.commentDetailWrapper : ""}>
          <div className={styles.commentHeader}>
            <Link to={`/user/${comment.user.id}`} className={styles.user}>
              <img
                src={
                  comment.user.profilePhotoURL
                    ? comment.user.profilePhotoURL
                    : person
                }
                alt="user"
              />

              <p>{comment.user.username}</p>
            </Link>

            {isFromCreator && (
              <p className={`${styles.commentHeaderSub} ${styles.creator}`}>
                Creator
              </p>
            )}
            <p className={styles.commentHeaderSub}>{commentTimeFromNow}</p>
            {commentEdited && <p className={styles.commentHeaderSub}>Edited</p>}
          </div>

          {!showComment ? null : showEdit ? (
            <CommentEditor
              handleCloseEditor={handleToggleEdit}
              handleSubmit={handleUpdateComment}
              defaultValue={comment.detail}
            />
          ) : (
            <>
              <p className={styles.commentDetail}>{comment.detail}</p>
              <div
                className={`${styles.commentAction} ${
                  showReply ? styles.utilMB : ""
                }`}
              >
                <Button
                  label={`${comment.likeCount} Likes`}
                  onClick={handleLikeComment}
                  style={
                    comment?.userLiked
                      ? actionButtonStyleLiked
                      : actionButtonStyle
                  }
                />

                {isFromCommentAuthor && (
                  <>
                    <Button
                      label="Edit"
                      style={actionButtonStyle}
                      onClick={handleToggleEdit}
                    />
                    <Button
                      label="Delete"
                      style={actionButtonStyle}
                      onClick={handleDeleteComment}
                    />
                  </>
                )}

                {!showReply && (
                  <Button
                    label="Reply"
                    onClick={handleToggleReply}
                    style={actionButtonStyle}
                  />
                )}
              </div>

              {showReply && (
                <CommentEditor
                  handleSubmit={
                    commentHooks.level < 3
                      ? childCommentHooks.handleSubmitReply
                      : commentHooks.handleSubmitReply
                  }
                  handleCloseEditor={handleToggleReply}
                />
              )}
            </>
          )}
        </div>

        {childCommentHooks.comments.length ? (
          <div className={` ${!showComment && styles.hide}`}>
            <CommentsContainer commentHooks={childCommentHooks} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Comment;
