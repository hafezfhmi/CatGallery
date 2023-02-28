import Button from "../../../../components/Button";
import ErrorModal from "../../../../components/ErrorModal";
import TextInput from "../../../../components/TextInput";
import styles from "./forgotPasswordForm.module.css";

import useField from "../../../../hooks/useField";
import useError from "../../../../hooks/useError";
import authServices from "../../../../services/auth";

const ForgotPasswordForm = ({ setSubmitted }) => {
  const email = useField("email", "email");
  const error = useError();

  const validate = () => {
    let emailError = "";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.attributes.value)) {
      emailError = "Invalid email";
    }

    email.setError(emailError);

    if (emailError) {
      return false;
    }

    return true;
  };

  let handleSubmitEmail = async (event) => {
    event.preventDefault();

    let formValid = validate();

    if (!formValid) {
      return;
    }

    try {
      await authServices.forgotPassword(email.attributes.value);
      setSubmitted(true);
    } catch (err) {
      error.handleError(true, err?.response?.data?.message || err.message);
    }
  };

  return (
    <>
      {error.error && (
        <ErrorModal
          errorMsg={error.errorMsg}
          disableError={error.disableError}
        />
      )}

      <form className={styles.forgotPasswordForm} onSubmit={handleSubmitEmail}>
        <h1>Forgot password</h1>

        <TextInput field={email} label="Email" />

        <Button label="Submit" style={{ marginTop: "1.2rem", width: "100%" }} />
      </form>
    </>
  );
};

export default ForgotPasswordForm;
