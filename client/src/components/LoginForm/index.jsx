import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../Button";
import ErrorModal from "../ErrorModal";
import TextInput from "../TextInput.js";
import styles from "./loginForm.module.css";

import { useField, useError } from "../../hooks/index";
import { UseUserContext } from "../../context/userContext";

const LoginForm = ({ redirect = true, disableError = null }) => {
  const navigate = useNavigate();
  const email = useField("text", "email");
  const password = useField("password", "password");
  const error = useError();

  const login = UseUserContext().login;

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
      if (redirect) {
        navigate("/");
      }

      if (disableError) {
        disableError();
      }
    } catch (err) {
      error.handleError(true, err?.response?.data?.msg || err.message);
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
          <Link to={"/forgot-password"}>Forgot Password</Link>
          <p>
            Don't have an account? <Link to={"/signup"}>Sign up</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
