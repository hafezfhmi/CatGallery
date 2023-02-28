import styles from "./card.module.css";

const Card = ({ children, style }) => {
  return (
    <div className={styles.card} style={style}>
      {children}
    </div>
  );
};

export default Card;
