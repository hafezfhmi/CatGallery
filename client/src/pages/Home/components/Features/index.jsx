import { MdVerified } from "react-icons/md";
import Button from "../../../../components/Button";
import styles from "./features.module.css";
import cat1 from "../../../../assets/cat1.jpg";
import cat2 from "../../../../assets/cat2.jpg";
import cat3 from "../../../../assets/cat3.jpg";
import cat4 from "../../../../assets/cat4.jpg";
import cat5 from "../../../../assets/cat5.jpg";
import cat6 from "../../../../assets/cat6.jpg";
import cat7 from "../../../../assets/cat7.jpg";
import cat8 from "../../../../assets/cat8.jpg";
import cat9 from "../../../../assets/cat9.jpg";
import cat10 from "../../../../assets/cat10.jpg";
import cat11 from "../../../../assets/cat11.jpg";
import cat12 from "../../../../assets/cat12.jpg";
import cat13 from "../../../../assets/cat13.jpg";
import cat14 from "../../../../assets/cat14.jpg";
import cat15 from "../../../../assets/cat15.jpg";
import catHead from "../../../../assets/cat-head.webp";

const Features = () => {
  return (
    <section className={styles.features}>
      <div className={styles.feature}>
        <div className={styles.catGrid}>
          <div className={styles.catColumnWrapper}>
            <div className={styles.catColumn}>
              <img src={cat1} alt="A cat" />
              <img src={cat2} alt="A cat" />
              <img src={cat3} alt="A cat" />
              <img src={cat4} alt="A cat" />
              <img src={cat5} alt="A cat" />
            </div>
          </div>
          <div className={styles.catColumnWrapper}>
            <div className={styles.catColumn + " " + styles.animationReverse}>
              <img src={cat6} alt="A cat" />
              <img src={cat7} alt="A cat" />
              <img src={cat8} alt="A cat" />
              <img src={cat9} alt="A cat" />
              <img src={cat10} alt="A cat" />
            </div>
          </div>
          <div className={styles.catColumnWrapper}>
            <div className={styles.catColumn}>
              <img src={cat11} alt="A cat" />
              <img src={cat12} alt="A cat" />
              <img src={cat13} alt="A cat" />
              <img src={cat14} alt="A cat" />
              <img src={cat15} alt="A cat" />
            </div>
          </div>
        </div>
        <div className={styles.featureTextWrapper}>
          <h2>Explore</h2>
          <h3>Varieties of cats</h3>
          <p>New cat photos from our users around the globe everyday</p>
        </div>
      </div>

      <div className={styles.feature}>
        <div className={styles.catUpload}>
          <Button label="Upload" />
          <div className={styles.catImageWrapper}>
            <img src={cat1} alt="" />
            <img src={cat2} alt="" />
            <img src={cat3} alt="" />
          </div>
          <div className={styles.uploadIndicator}>
            <span></span>
          </div>
          <div className={styles.catUploaded}>
            <MdVerified className={styles.completed} />
            <p>Completed</p>
          </div>
        </div>
        <div className={styles.featureTextWrapper}>
          <h2>Upload</h2>
          <h3>Share the moment of your cats</h3>
          <p>Upload your cat photos to be seen by others</p>
        </div>
      </div>

      <div className={styles.feature}>
        <div className={styles.catConnect}>
          <img src={catHead} alt="" />
          <img src={catHead} alt="" />
          <img src={catHead} alt="" />
          <img src={catHead} alt="" />
          <div className={styles.catCenter}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <img src={catHead} alt="" />
          </div>
        </div>
        <div className={styles.featureTextWrapper}>
          <h2>Connect</h2>
          <h3>Make friends with other cat lovers</h3>
          <p>
            Love their cat photos? Connect with the owner, comment and upvote
            their cat photos
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
