import { useState } from "react";
import Card from "../../components/Card";
import ForgotPasswordForm from "./components/forgotPasswordForm";
import styles from "./forgotPassword.module.css";

const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className={styles.forgotPassword}>
      {!submitted ? (
        <ForgotPasswordForm setSubmitted={setSubmitted} />
      ) : (
        <Card>
          <p className={styles.successText}>
            Your password reset request has been received
            <br />
            Please check your email
          </p>
        </Card>
      )}
    </div>
  );
};

export default ForgotPassword;
