import PasswordResetForm from "./components/passwordResetForm";
import styles from "./passwordReset.module.css";

const PasswordReset = () => {
  return (
    <div className={styles.passwordReset}>
      <PasswordResetForm />
    </div>
  );
};

export default PasswordReset;
