import styles from "./displayUser.module.css";
import person from "../../../../assets/person-1.jpg";

const DisplayUser = ({ user }) => {
  return (
    <div className={styles.displayUser}>
      {user.profilePhotoUrl ? (
        <img src={user.profilePhotoUrl} alt="user profile" />
      ) : (
        <img src={person} alt="user profile" />
      )}
      <h1>{`${user.firstName} ${user.lastName}`}</h1>
      <h2>{`@${user.username}`}</h2>
    </div>
  );
};

export default DisplayUser;
