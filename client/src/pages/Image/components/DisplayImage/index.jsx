import styles from "./displayImage.module.css";

const DisplayImage = ({ imageUrl }) => {
  return (
    <div className={styles.displayImage}>
      <img src={imageUrl} alt="" />
    </div>
  );
};

export default DisplayImage;
