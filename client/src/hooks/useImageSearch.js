import { useState, useEffect } from "react";
import imageServices from "../services/images";

const useImageSearch = (pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    let ignore = false;

    setLoading(true);

    const fetchData = async () => {
      let images = await imageServices.getImagesByPage(pageNumber);

      if (!ignore) {
        setImages((prev) => [
          ...prev.slice(0, prev.length - 1),
          ...images,
          { id: "lastImage" },
        ]);
        setHasMore(images.length > 0);
      }
      setLoading(false);
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [pageNumber]);

  return { loading, images, hasMore };
};

export default useImageSearch;
