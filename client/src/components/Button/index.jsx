import { Link } from "react-router-dom";
import styles from "./button.module.css";

const Button = ({ to, onClick, label, style, disabled = false }) => {
  if (to) {
    return (
      <Link to={to}>
        <button
          className={styles.button}
          onClick={onClick}
          style={style}
          disabled={disabled}
        >
          {label}
        </button>
      </Link>
    );
  } else {
    return (
      <button
        className={styles.button}
        onClick={onClick}
        style={style}
        disabled={disabled}
      >
        {label}
      </button>
    );
  }
};

export default Button;
