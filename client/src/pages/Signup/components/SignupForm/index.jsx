import { useNavigate, Link } from "react-router-dom";
import Button from "../../../../components/Button";
import ErrorModal from "../../../../components/ErrorModal";
import TextInput from "../../../../components/TextInput";
import styles from "./signupForm.module.css";

import useField from "../../../../hooks/useField";
import useError from "../../../../hooks/useError";
import authServices from "../../../../services/auth";

const SignupForm = () => {
  const navigate = useNavigate();

  const firstName = useField("text", "firstName");
  const lastName = useField("text", "lastName");
  const username = useField("text", "username");
  const email = useField("email", "email");
  const password = useField("password", "password");
  const confirmPassword = useField("password", "confirmPassword");
  const error = useError();

  const validate = () => {
    let firstNameError = "";
    let lastNameError = "";
    let usernameError = "";
    let emailError = "";
    let passwordError = "";
    let confirmPasswordError = "";

    if (firstName.attributes.value.trim().length === 0) {
      firstNameError = "First name is required";
    }

    if (lastName.attributes.value.trim().length === 0) {
      lastNameError = "Last name is required";
    }

    if (username.attributes.value.trim().length === 0) {
      usernameError = "Username is required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.attributes.value)) {
      emailError = "Invalid email";
    }

    if (password.attributes.value !== confirmPassword.attributes.value) {
      confirmPasswordError = "Password should be equal";
    }

    if (password.attributes.value.trim().length === 0) {
      passwordError = "Password is required";
    }

    if (confirmPassword.attributes.value.trim().length === 0) {
      confirmPasswordError = "Confirm password is required";
    }

    firstName.setError(firstNameError);
    lastName.setError(lastNameError);
    username.setError(usernameError);
    email.setError(emailError);
    password.setError(passwordError);
    confirmPassword.setError(confirmPasswordError);

    if (
      firstNameError ||
      lastNameError ||
      usernameError ||
      emailError ||
      passwordError ||
      confirmPasswordError
    ) {
      return false;
    }

    return true;
  };

  let handleSignup = async (event) => {
    event.preventDefault();

    let formValid = validate();

    if (!formValid) {
      return;
    }

    try {
      await authServices.signup(
        username.attributes.value,
        firstName.attributes.value,
        lastName.attributes.value,
        email.attributes.value,
        password.attributes.value,
        confirmPassword.attributes.value
      );

      navigate("/signup-validation");
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

      <form className={styles.authForm} onSubmit={handleSignup}>
        <h1>Sign up</h1>

        <div className={styles.nameWrapper}>
          <TextInput field={firstName} label="First name" />
          <TextInput field={lastName} label="Last name" />
        </div>

        <TextInput field={username} label="Username" />
        <TextInput field={email} label="Email" />
        <TextInput field={password} label="Password" />
        <TextInput field={confirmPassword} label="Confirm Password" />

        <Button
          label="Sign up"
          style={{ marginTop: "1.2rem", width: "100%" }}
        />

        <div className={styles.extraWrapper}>
          <p>
            Have an account? <Link to={"/auth/login"}>Log in</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
