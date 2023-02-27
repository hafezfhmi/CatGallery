import LoginForm from "./components/LoginForm";
import styles from "./login.module.css";

const Login = () => {
  return (
    <div className={styles.login}>
      <LoginForm />
    </div>
  );
};

export default Login;
