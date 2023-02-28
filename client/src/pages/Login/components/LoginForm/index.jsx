import { Link } from "react-router-dom";
import Button from "../../../../components/Button";
import ErrorModal from "../../../../components/ErrorModal";
import TextInput from "../../../../components/TextInput";
import styles from "./loginForm.module.css";

import useField from "../../../../hooks/useField";
import useError from "../../../../hooks/useError";
import { useUserContext } from "../../../../context/userContext";

const LoginForm = ({ disableError = null }) => {
  const email = useField("text", "email");
  const password = useField("password", "password");
  const error = useError();

  const login = useUserContext().login;

  const validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.attributes.value)) {
      emailError = "Invalid email";
    }

    if (password.attributes.value.length === 0) {
      passwordError = "Password is required";
    }

    email.setError(emailError);
    password.setError(passwordError);

    if (emailError || passwordError) {
      return false;
    }

    return true;
  };

  let handleLogin = async (event) => {
    event.preventDefault();

    let formValid = validate();

    if (!formValid) {
      return;
    }

    try {
      await login(email.attributes.value, password.attributes.value);
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

      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h1>Log in</h1>
        <TextInput field={email} label="Email" />
        <TextInput field={password} label="Password" />

        <Button label="Log in" style={{ marginTop: "1.2rem", width: "100%" }} />

        <div className={styles.extraWrapper}>
          <Link to={"/auth/forgot-password"}>Forgot Password</Link>
          <p>
            Don't have an account? <Link to={"/signup"}>Sign up</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
