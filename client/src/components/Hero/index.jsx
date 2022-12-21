import React from "react";
import Button from "../Button";
import { AiFillStar } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import styles from "./hero.module.css";
import cameraImg from "../../assets/camera.webp";
import catHeroImg from "../../assets/cat-hero.png";
import person1 from "../../assets/person-1.jpg";

const Hero = () => {
  return (
    <main className={styles.hero + " section"}>
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
        <Button to="gallery" label="Get started" />
        <div className={styles.heroStatsContainer}>
          <div>
            <p>
              <span>20K+</span> Cat photos uploaded
            </p>
          </div>
          <span className={styles.statsSeparator} />
          <div>
            <p>
              <span>2K+</span> People uploading their cat photos
            </p>
          </div>
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
            <div className={styles.likesContainer}>
              <FcLike className={styles.likes} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
