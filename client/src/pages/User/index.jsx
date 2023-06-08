import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userServices from "../../services/user";
import DisplayUser from "./components/DisplayUser";
import styles from "./user.module.css";
import ImageGallery from "../Gallery/components/ImageGallery";
import imageServices from "../../services/images";

const User = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    let ignore = false;
    let fetchedUser;

    const fetchData = async (userId) => {
      fetchedUser = await userServices.getUser(userId);

      if (!ignore) setUser(fetchedUser);
    };

    fetchData(userId);

    return () => {
      ignore = true;
    };
  }, [userId]);

  return (
    <div className={styles.user}>
      {user ? (
        <>
          <DisplayUser user={user} />
          <hr />
          <ImageGallery
            request={imageServices.getUserImagesByPage}
            userId={userId}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default User;
