import { AiFillStar } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import Button from "../../../../components/Button";
import styles from "./hero.module.css";
import cameraImg from "../../../../assets/camera.webp";
import catHeroImg from "../../../../assets/cat-hero.png";
import person1 from "../../../../assets/person-1.jpg";

const Hero = () => {
  return (
    <section className={styles.hero}>
      {/* Hero headline */}
      <div className={styles.heroHeadline}>
        <h1>
          Explore the world of cats with our gallery app{" "}
          <img src={cameraImg} alt="" />
        </h1>
        <p>
          Discover new breeds, share your photos, and connect with new paw lover
          friends all in one place
        </p>
        <Button
          to="/gallery"
          label="Visit gallery"
          style={{ marginBottom: "2.2rem" }}
        />
        <div className={styles.heroStatsWrapper}>
          <p>
            <span>20K+</span> Cat photos uploaded
          </p>
          <span className={styles.statsSeparator} />
          <p>
            <span>2K+</span> People uploading their cat photos
          </p>
        </div>
      </div>

      {/* Hero image */}
      <div className={styles.heroImg}>
        <div className={styles.heroImgBg}>
          <img src={catHeroImg} alt="" />
          <div className={styles.heroReview}>
            <div className={styles.heroReviewProfile}>
              <img src={person1} alt="" />
              <div className={styles.heroReviewUser}>
                <p>John Doe</p>
                <div className={styles.heroReviewRating}>
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                </div>
              </div>
            </div>
            <p>"The best place to find cat photos"</p>
          </div>
          <div className={styles.heroBest}>
            <p>
              <MdVerified className={styles.verified} /> Best cat photos!
            </p>
            <div className={styles.likesWrapper}>
              <FcLike className={styles.likes} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
