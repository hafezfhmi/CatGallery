import { Link } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import RootCommentsContainer from "../RootCommentsContainer";
import styles from "./imageDetails.module.css";
import person from "../../../../assets/person-1.jpg";

const ImageDetails = ({ image, handleLike }) => {
  return (
    <>
      <div className={styles.imageDetails}>
        <h1>{image.title}</h1>
        <p>{image.description}</p>

        <Link to={`/user/${image.user.id}`} className={styles.user}>
          <img src={image.user?.userProfile || person} alt="" />
          {image.user.username}
        </Link>

        <div className={styles.likeContainer}>
          <FcLike
            className={!image.userLiked && styles.unliked}
            onClick={handleLike}
          />
          <p>{image.likeCount} Likes</p>
        </div>

        <hr />

        <h2>Comments</h2>
        <RootCommentsContainer
          imageId={image.id}
          imageCreatorId={image.user.id}
        />
      </div>
    </>
  );
};

export default ImageDetails;
