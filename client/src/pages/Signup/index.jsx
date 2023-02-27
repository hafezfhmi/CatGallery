import SignupForm from "./components/SignupForm";
import styles from "./signup.module.css";

const Signup = () => {
  return (
    <div className={styles.signup}>
      <SignupForm />
    </div>
  );
};

export default Signup;
