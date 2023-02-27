import { useState, useEffect } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import styles from "./testimonialSlider.module.css";
import userPhoto from "../../../../assets/person-1.jpg";

const testimonialList = [
  {
    username: "Sarah K.",
    testimonial:
      '"I absolutely adore the cat photos on this website! The quality is outstanding and the subjects are so cute and full of personality."',
  },
  {
    username: "John D.",
    testimonial:
      '"As a cat lover, I was thrilled to discover this website. The variety of cat breeds and poses is impressive and the images are stunning."',
  },
  {
    username: "Emily S.",
    testimonial:
      '"I stumbled upon this website while searching for cat-themed gifts for a friend and I\'m so glad I did. Highly recommend!"',
  },
  {
    username: "Jane M.",
    testimonial:
      '"The photographers do such a great job capturing the beauty and personality of each feline."',
  },
  {
    username: "Maria G.",
    testimonial:
      '"I am in love with the cat photos on this website! The quality is excellent and the subjects are so adorable."',
  },
  {
    username: "Elizabeth W.",
    testimonial:
      '"I recently discovered this cat gallery and I am hooked! Thank you for such a wonderful experience."',
  },
];

const TestimonialSlider = () => {
  const [positionXMultiplier, setPositionXMultiplier] = useState(0);
  const [positionXValue, setPositionXValue] = useState(35);

  const moveRange = 0 - Math.ceil(testimonialList.length / 2);
  const moveRangeMb = 0 - testimonialList.length + 1;

  const positionXUpdater = () => {
    if (window.innerWidth > 900 && positionXValue !== 35) {
      setPositionXValue(35);
      if (positionXMultiplier <= moveRange) setPositionXMultiplier(moveRange);
    } else if (window.innerWidth <= 900 && positionXValue !== 110) {
      setPositionXValue(110);
    }
  };

  positionXUpdater();

  // Updating value based on viewport size
  // https://stackoverflow.com/questions/46586165/react-conditionally-render-based-on-viewport-size
  useEffect(() => {
    window.addEventListener("resize", positionXUpdater);

    return () => {
      window.removeEventListener("resize", positionXUpdater);
    };
  });

  const handleMoveRight = () => {
    setPositionXMultiplier((prevPositionXMultiplier) => {
      if (positionXValue === 35) {
        if (positionXMultiplier <= moveRange) return moveRange;
      } else if (positionXValue === 110) {
        if (positionXMultiplier <= moveRangeMb) return moveRangeMb;
      }
      return positionXMultiplier - 1;
    });
  };

  const handleMoveLeft = () => {
    setPositionXMultiplier((prevPositionXMultiplier) => {
      if (positionXMultiplier === 0) return 0;
      return positionXMultiplier + 1;
    });
  };

  return (
    <div className={styles.testimonialWrapper}>
      <div
        className={styles.testimonialSlider}
        style={{ left: `${positionXValue * positionXMultiplier}%` }}
      >
        {testimonialList.map((testimonial, index) => (
          <div className={styles.testimonialCard} key={index}>
            <p>{testimonial.testimonial}</p>
            <div className={styles.testomonialUser}>
              <img src={userPhoto} alt="" />
              <p>{testimonial.username}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.buttonWrapper}>
        <button onClick={handleMoveLeft}>
          <AiFillCaretLeft />
        </button>
        <button onClick={handleMoveRight}>
          <AiFillCaretRight />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
