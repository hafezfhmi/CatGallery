import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import ErrorModal from "../../../../components/ErrorModal";
import TextInput from "../../../../components/TextInput";
import styles from "./passwordResetForm.module.css";

import useField from "../../../../hooks/useField";
import useError from "../../../../hooks/useError";
import authServices from "../../../../services/auth";

const PasswordResetForm = () => {
  const navigate = useNavigate();
  const { tokenId } = useParams();
  const password = useField("password", "password");
  const confirmPassword = useField("password", "confirmPassword");
  const error = useError();
  const passwordValidityError = useError();

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        if (!ignore) {
          await authServices.checkPasswordResetValidity(tokenId);
        }
      } catch (err) {
        passwordValidityError.handleError(
          true,
          `${err?.response?.data?.message}. Redirecting to login page...` ||
            `${err.message}. Redirecting to login page...`
        );

        setTimeout(() => {
          navigate("/auth/login");
        }, 5000);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [tokenId, navigate, passwordValidityError]);

  const validate = () => {
    let passwordError = "";
    let confirmPasswordError = "";

    if (password.attributes.value !== confirmPassword.attributes.value) {
      confirmPasswordError = "Password should be equal";
    }

    if (password.attributes.value.trim().length === 0) {
      passwordError = "Password is required";
    }

    if (confirmPassword.attributes.value.trim().length === 0) {
      confirmPasswordError = "Confirm password is required";
    }

    password.setError(passwordError);
    confirmPassword.setError(confirmPasswordError);

    if (passwordError || confirmPasswordError) {
      return false;
    }

    return true;
  };

  let handleSubmitPassword = async (event) => {
    event.preventDefault();

    let formValid = validate();

    if (!formValid) {
      return;
    }

    try {
      await authServices.passwordReset(
        tokenId,
        password.attributes.value,
        confirmPassword.attributes.value
      );

      navigate("/auth/login");
    } catch (err) {
      error.handleError(true, err?.response?.data?.message || err.message);
    }
  };

  return (
    <>
      {passwordValidityError.error && (
        <ErrorModal errorMsg={passwordValidityError.errorMsg} />
      )}

      {error.error && (
        <ErrorModal
          errorMsg={error.errorMsg}
          disableError={error.disableError}
        />
      )}

      <form className={styles.resetForm} onSubmit={handleSubmitPassword}>
        <h1>Reset password</h1>

        <TextInput field={password} label="Password" />
        <TextInput field={confirmPassword} label="Confirm Password" />

        <Button
          label="Reset password"
          style={{ marginTop: "1.2rem", width: "100%" }}
        />
      </form>
    </>
  );
};

export default PasswordResetForm;
