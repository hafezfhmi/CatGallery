import { useState } from "react";

const useFileDrop = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleOnDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    setImage(file);

    // get image url that can be used to display on img tag
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // get image url that can be used to display on img tag
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImage(null);
    setImageUrl(null);
  };

  return {
    areaDrop: { onDrop: handleOnDrop, onDragOver: handleDragOver },
    inputDrop: {
      onChange: handleInputChange,
    },
    clearImage,
    value: {
      image,
      imageUrl,
    },
  };
};

export default useFileDrop;
