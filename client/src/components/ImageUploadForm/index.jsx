import React from "react";
import { useField } from "../../hooks/index";
import { useFileDrop, useError } from "../../hooks/index";
import FileDrop from "../fileDrop";
import TextInput from "../TextInput.js";
import Button from "../Button";
import ErrorModal from "../ErrorModal";
import imageService from "../../services/images";
import styles from "./imageUploadForm.module.css";

const ImageUploadForm = () => {
  const title = useField("text", "title");
  const description = useField("", "description");
  const fileDrop = useFileDrop();
  const error = useError();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await imageService.createImage(
        title.attributes.value,
        description.attributes.value,
        fileDrop.value.image
      );
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
      <form className={styles.imageUploadForm} onSubmit={handleSubmit}>
        <div className={styles.fileDropWrapper}>
          <FileDrop fileDrop={fileDrop} />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput field={title} label="Title" />
          <TextInput field={description} label="Description" type="textarea" />
          <Button
            label="Upload"
            style={{ marginTop: "1.2rem", width: "100%" }}
          />
        </div>
      </form>
    </>
  );
};

export default ImageUploadForm;
