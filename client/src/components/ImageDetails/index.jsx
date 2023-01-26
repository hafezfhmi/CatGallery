import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import TextInput from "../TextInput.js";
import Button from "../Button";
import { useField } from "../../hooks/index.js";
import userService from "../../services/users";
import imageService from "../../services/images";
import commentService from "../../services/comment.js";
import { UseUserContext } from "../../context/userContext.js";
import styles from "./imageDetails.module.css";
import person from "../../assets/person-1.jpg";
import LoginModal from "../LoginModal/index.jsx";

const ImageDetails = ({ image }) => {
  const [user, setUser] = useState(null);
  const [likesAmount, setLikesAmount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [showLogin, setShowLogin] = useState(false);

  const userCtx = UseUserContext();

  const comment = useField("", "comment");

  const handleOnClickLogin = useCallback(() => {
    if (!userCtx.isLoggedIn) {
      setShowLogin(true);
      return true;
    }

    return false;
  }, [userCtx.isLoggedIn]);

  // get user data
  useEffect(() => {
    const fetchUserData = async (id) => {
      const userData = await userService.getOne(image.userId);
      setUser(userData);
    };

    fetchUserData();
  }, [image.userId]);

  // get likes amount and user liked
  useEffect(() => {
    const fetchLikedData = async () => {
      const likesAmountData = await imageService.getLikesAmount(image.id);

      setLikesAmount(likesAmountData.likesAmount);
    };

    const fetchUserLikedData = async () => {
      const userLikedData = await imageService.getUserLiked(image.id);

      setLiked(userLikedData.liked);
    };

    fetchLikedData();
    fetchUserLikedData();
  }, [image.id]);

  const handleLikes = () => {
    const loginShowed = handleOnClickLogin();

    if (loginShowed) {
      return;
    }

    try {
      imageService.likeOne(image.id);
      setLiked((prev) => !prev);

      if (liked) {
        setLikesAmount((prev) => prev - 1);
      } else {
        setLikesAmount((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRootCommmentSubmit = async (e) => {
    e.preventDefault();

    const loginShowed = handleOnClickLogin();

    if (loginShowed) {
      return;
    }

    // TODO: Add functionality to refer to parent comment id, maybe move the comment to its own component. But this one is the root reply comment so parentId can be null
    let newComment = await commentService.create(
      comment.attributes.value,
      image.id,
      null
    );
    setComments((prev) => [...prev, newComment]);
    comment.reset();
  };

  // TODO: USEEFFECT FETCH COMMENT
  useEffect(() => {
    const fetchCommentData = async () => {
      const commentData = await commentService.getAll(image.id);

      setComments(commentData);
    };

    fetchCommentData();
  }, [image.id]);

  return (
    <>
      {showLogin && <LoginModal disableError={() => setShowLogin(false)} />}
      <div className={styles.imageDetails}>
        <h1>{image.title}</h1>
        <p>{image.description}</p>

        <div className={styles.user}>
          <img src={user?.userProfile || person} alt="" />
          <Link to={`/user/${user?.id}`}>{user?.username}</Link>
        </div>

        <div className={styles.likeContainer}>
          <FcLike className={!liked && styles.unliked} onClick={handleLikes} />
          <p>{likesAmount} Likes</p>
        </div>

        <form
          className={styles.commentFormContainer}
          onSubmit={handleRootCommmentSubmit}
        >
          <TextInput field={comment} label={"Comment"} type="textarea" />
          <Button label="Add comment" style={{ marginTop: "1.2rem" }} />
        </form>

        <div className={styles.commentListContainer}>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} className={styles.commentList}>
                <img src={user?.userProfile || person} alt="" />
                <div className={styles.commentListDetails}>
                  <p>{comment.user.username}</p>
                  <p>{comment.detail}</p>

                  <div className={styles.commentAction}>
                    <p>Reply</p>
                    <p>Edit</p>
                    <p>Like</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ImageDetails;
