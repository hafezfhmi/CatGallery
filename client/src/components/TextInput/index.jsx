import styles from "./TextInput.module.css";

const TextInput = ({ field, label, type = "input" }) => {
  let inputMarkup;

  switch (type) {
    case "textarea":
      inputMarkup = (
        <textarea className={styles.textInput} {...field.attributes} />
      );
      break;
    default:
      inputMarkup = (
        <input className={styles.textInput} {...field.attributes} noValidate />
      );
  }

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.labelWrapper}>
        <label htmlFor={field.attributes.id}>{label}: </label>
        {field.error && <p>{field.error}</p>}
      </div>
      {inputMarkup}
    </div>
  );
};

export default TextInput;
