import Button from "../../../../components/Button";
import styles from "./lastCTA.module.css";

const LastCTA = () => {
  return (
    <section className={styles.lastCTA}>
      <h2>Be a part of the cat gallery now!</h2>

      <Button
        to="/auth/signup"
        label="Sign up"
        style={{ display: "block", margin: "0 auto" }}
      />
    </section>
  );
};

export default LastCTA;
