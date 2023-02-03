import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import imageService from "../../services/images";
import { UseUserContext } from "../../context/userContext.js";
import styles from "./imageDetails.module.css";
import person from "../../assets/person-1.jpg";
import LoginModal from "../LoginModal/index.jsx";
import Comments from "../Comments";

const ImageDetails = ({ image }) => {
  const [likesAmount, setLikesAmount] = useState(image.likeCount);
  const [liked, setLiked] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const userCtx = UseUserContext();

  const handleOnClickLogin = useCallback(() => {
    if (!userCtx.isLoggedIn) {
      setShowLogin(true);
      return true;
    }

    return false;
  }, [userCtx.isLoggedIn]);

  // get user liked
  useEffect(() => {
    const fetchData = async () => {
      const fetchUserLiked = await imageService.getUserLiked(image.id);

      setLiked(fetchUserLiked.liked);
    };

    fetchData();
  }, [image.id]);

  const handleLike = () => {
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

  return (
    <>
      {showLogin && <LoginModal disableError={() => setShowLogin(false)} />}
      <div className={styles.imageDetails}>
        <h1>{image.title}</h1>
        <p>{image.description}</p>

        <Link to={`/user/${image.user.id}`} className={styles.user}>
          <img src={image.user?.userProfile || person} alt="" />
          {image.user.username}
        </Link>

        <div className={styles.likeContainer}>
          <FcLike className={!liked && styles.unliked} onClick={handleLike} />
          <p>{likesAmount} Likes</p>
        </div>

        <hr />

        <Comments imageId={image.id} />
      </div>
    </>
  );
};

export default ImageDetails;
