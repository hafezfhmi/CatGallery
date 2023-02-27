import TestimonialSlider from "../TestimonialSlider";
import styles from "./testimonial.module.css";

const Testimonial = () => {
  return (
    <section className={styles.testimonial}>
      <h2>Pawsitive feedback from cat lovers everywhere</h2>
      <TestimonialSlider />
    </section>
  );
};

export default Testimonial;
