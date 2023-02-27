import { useNavigate } from "react-router-dom";
import useField from "../../../../hooks/useField";
import useFileDrop from "../../../../hooks/useFileDrop";
import useError from "../../../../hooks/useError";
import imageService from "../../../../services/images";
import styles from "./imageUploadForm.module.css";
import FileDrop from "../fileDrop";
import TextInput from "../../../../components/TextInput";
import Button from "../../../../components/Button";
import ErrorModal from "../../../../components/ErrorModal";

const ImageUploadForm = () => {
  const navigate = useNavigate();
  const title = useField("text", "title");
  const description = useField("", "description");
  const fileDrop = useFileDrop();
  const error = useError();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let uploadedImage = await imageService.postImage(
        title.attributes.value,
        description.attributes.value,
        fileDrop.value.image
      );

      navigate(`/image/${uploadedImage.id}`);
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
