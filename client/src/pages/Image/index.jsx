import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useLoginModal from "../../hooks/useLoginModal";
import useError from "../../hooks/useError";
import imageServices from "../../services/images";
import styles from "./image.module.css";
import DisplayImage from "./components/DisplayImage/index.jsx";
import ImageDetails from "./components/ImageDetails/index.jsx";
import LoginModal from "../Login/components/LoginModal";
import ErrorModal from "../../components/ErrorModal/index.jsx";

const Image = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const loginChecker = useLoginModal();
  const error = useError();

  useEffect(() => {
    let ignore = false;
    let fetchedImage;

    const fetchData = async (id) => {
      fetchedImage = await imageServices.getImage(id);

      if (!ignore) setImage(fetchedImage);
    };

    fetchData(id);

    return () => {
      ignore = true;
    };
  }, [id]);

  const handleLike = async () => {
    loginChecker.checkLogin();
    if (!loginChecker.isLoggedIn) {
      return;
    }

    try {
      await imageServices.postLikeImage(image.id);

      setImage((prevImage) => {
        return {
          ...prevImage,
          userLiked: !prevImage.userLiked,
          likeCount: prevImage.userLiked
            ? prevImage.likeCount - 1
            : prevImage.likeCount + 1,
        };
      });
    } catch (err) {
      error.handleError(true, err?.response?.data?.message || err.message);
    }
  };

  return (
    <>
      {loginChecker.showLogin && (
        <LoginModal unshowLogin={loginChecker.disableLoginModal} />
      )}

      {error.error && (
        <ErrorModal
          errorMsg={error.errorMsg}
          disableError={error.disableError}
        />
      )}

      <div className={styles.image}>
        {image ? (
          <>
            <DisplayImage imageUrl={image.imageUrl} />
            <ImageDetails image={image} handleLike={handleLike} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Image;
