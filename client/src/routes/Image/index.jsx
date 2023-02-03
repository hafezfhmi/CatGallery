import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisplayImage from "../../components/DisplayImage";
import ImageDetails from "../../components/ImageDetails";
import styles from "./image.module.css";
import imageServices from "../../services/images";

const Image = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async (id) => {
      const fetchedImage = await imageServices.getOne(id);

      setImage(fetchedImage);
    };

    fetchData(id);
  }, [id]);

  return (
    <div className={styles.image}>
      {image && (
        <>
          <DisplayImage imageUrl={image.imageUrl} />
          <ImageDetails image={image} />
        </>
      )}
    </div>
  );
};

export default Image;
