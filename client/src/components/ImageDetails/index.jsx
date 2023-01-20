import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import userService from "../../services/users";
import ImageService from "../../services/images";
import styles from "./imageDetails.module.css";
import person from "../../assets/person-1.jpg";

const ImageDetails = ({ image }) => {
  const [user, setUser] = useState(null);
  const [likesAmount, setLikesAmount] = useState(0);
  const [liked, setLiked] = useState(false);

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
      const likesAmountData = await ImageService.getLikesAmount(image.id);

      setLikesAmount(likesAmountData.likesAmount);
    };

    const fetchUserLikedData = async () => {
      const userLikedData = await ImageService.getUserLiked(image.id);

      setLiked(userLikedData.liked);
    };

    fetchLikedData();
    fetchUserLikedData();
  }, [image.id]);

  const handleLikes = () => {
    try {
      ImageService.likeOne(image.id);
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

  //   TODO: FETCH LIKE STATUS, IF LIKED BY THE USER, SHOW A RED FILL LIKE ICON, ELSE, SHOW A RED OUTLINE WITH WHITE FILL LIKE ICON

  return (
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

      <div className={styles.commentContainer}>
        <h2>Comments</h2>

        <h3>Write a comment</h3>

        <ul></ul>
      </div>
    </div>
  );
};

export default ImageDetails;
