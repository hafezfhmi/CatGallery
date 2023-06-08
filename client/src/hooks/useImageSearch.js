import { useState, useEffect } from "react";

const useImageSearch = (pageNumber, request, userId) => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    let ignore = false;

    setLoading(true);

    const fetchData = async () => {
      let images;
      if (userId) {
        images = await request(pageNumber, userId);
      } else {
        images = await request(pageNumber);
      }

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
  }, [pageNumber, request, userId]);

  return { loading, images, hasMore };
};

export default useImageSearch;
