import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import useImageSearch from "../../../../hooks/useImageSearch";
import styles from "./imageGallery.module.css";

const ImageGallery = ({ request, userId }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [columnCount, setColumnCount] = useState(4);

  const observer = useRef();

  const { images, hasMore, loading } = useImageSearch(
    pageNumber,
    request,
    userId
  );

  useEffect(() => {
    const columnCountUpdater = () => {
      if (window.innerWidth <= 425) {
        setColumnCount(2);
      } else if (window.innerWidth <= 768) {
        setColumnCount(3);
      } else {
        setColumnCount(4);
      }
    };

    columnCountUpdater();

    window.addEventListener("resize", columnCountUpdater);

    return () => {
      window.removeEventListener("resize", columnCountUpdater);
    };
  }, []);

  const lastImageRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const columnMapper = (images, columnCount) => {
    let firstColumn = [];
    let secondColumn = [];
    let thirdColumn = [];
    let fourthColumn = [];

    let firstColumnFilled = false;
    let secondColumnFilled = false;
    let thirdColumnFilled = false;
    let fourthColumnFilled = false;

    for (let i = 0; i < images.length; i++) {
      // fill column placeholder
      if (columnCount === 2) {
        if (firstColumnFilled === false) {
          firstColumn = [...firstColumn, images[i]];
          firstColumnFilled = true;
        } else if (secondColumnFilled === false) {
          secondColumn = [...secondColumn, images[i]];
          secondColumnFilled = true;
        }
      } else if (columnCount === 3) {
        if (firstColumnFilled === false) {
          firstColumn = [...firstColumn, images[i]];
          firstColumnFilled = true;
        } else if (secondColumnFilled === false) {
          secondColumn = [...secondColumn, images[i]];
          secondColumnFilled = true;
        } else if (thirdColumnFilled === false) {
          thirdColumn = [...thirdColumn, images[i]];
          thirdColumnFilled = true;
        }
      } else if (columnCount === 4) {
        if (firstColumnFilled === false) {
          firstColumn = [...firstColumn, images[i]];
          firstColumnFilled = true;
        } else if (secondColumnFilled === false) {
          secondColumn = [...secondColumn, images[i]];
          secondColumnFilled = true;
        } else if (thirdColumnFilled === false) {
          thirdColumn = [...thirdColumn, images[i]];
          thirdColumnFilled = true;
        } else if (fourthColumnFilled === false) {
          fourthColumn = [...fourthColumn, images[i]];
          fourthColumnFilled = true;
        }
      }

      // reset columnFilled flag
      if (columnCount === 2 && secondColumnFilled === true) {
        firstColumnFilled = false;
        secondColumnFilled = false;
      } else if (columnCount === 3 && thirdColumnFilled === true) {
        firstColumnFilled = false;
        secondColumnFilled = false;
        thirdColumnFilled = false;
      } else if (columnCount === 4 && fourthColumnFilled === true) {
        firstColumnFilled = false;
        secondColumnFilled = false;
        thirdColumnFilled = false;
        fourthColumnFilled = false;
      }
    }

    return [firstColumn, secondColumn, thirdColumn, fourthColumn];
  };

  const markupMapper = (curr) => {
    if (curr.id === "lastImage") {
      return <div ref={lastImageRef} key={curr.id}></div>;
    }

    return (
      <div className={styles.imageContainer} key={curr.id}>
        <Link to={`/image/${curr.id}`}>
          <img src={curr.imageUrl} alt="" />
        </Link>
      </div>
    );
  };

  const imageColumn = columnMapper(images, columnCount);

  if (images.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryColumn}>
        {imageColumn[0].map(markupMapper)}
      </div>
      <div className={styles.galleryColumn}>
        {imageColumn[1].map(markupMapper)}
      </div>
      <div className={styles.galleryColumn + " " + styles.thirdColumn}>
        {imageColumn[2].map(markupMapper)}
      </div>
      <div className={styles.galleryColumn + " " + styles.fourthColumn}>
        {imageColumn[3].map(markupMapper)}
      </div>
    </div>
  );
};

export default ImageGallery;
