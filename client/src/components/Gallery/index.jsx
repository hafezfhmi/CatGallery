import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import imageServices from "../../services/images";
import styles from "./gallery.module.css";
import { useRef } from "react";

const Gallery = () => {
  const [imageList, setImageList] = useState([{ id: "bottomReference" }]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [columnSize, setColumnSize] = useState(4);
  const [column, setColumn] = useState([[], [], [], []]);

  const bottomRef = useRef(null);

  // Add resize event to update amount of column
  useEffect(() => {
    const columnSizeUpdater = () => {
      if (window.innerWidth <= 425) {
        setColumnSize(2);
      } else if (window.innerWidth <= 768) {
        setColumnSize(3);
      } else {
        setColumnSize(4);
      }
    };

    columnSizeUpdater();

    window.addEventListener("resize", columnSizeUpdater);

    return () => {
      window.removeEventListener("resize", columnSizeUpdater);
    };
  }, []);

  // Spread the image to its column
  useEffect(() => {
    let firstColumnPlaceholder = [];
    let secondColumnPlaceholder = [];
    let thirdColumnPlaceholder = [];
    let fourthColumnPlaceholder = [];

    const distributeImage = () => {
      let firstColumnFilled = false;
      let secondColumnFilled = false;
      let thirdColumnFilled = false;
      let fourthColumnFilled = false;

      for (let i = 0; i < imageList.length; i++) {
        // fill column placeholder
        if (columnSize === 2) {
          if (firstColumnFilled === false) {
            firstColumnPlaceholder = [...firstColumnPlaceholder, imageList[i]];
            firstColumnFilled = true;
          } else if (secondColumnFilled === false) {
            secondColumnPlaceholder = [
              ...secondColumnPlaceholder,
              imageList[i],
            ];
            secondColumnFilled = true;
          }
        } else if (columnSize === 3) {
          if (firstColumnFilled === false) {
            firstColumnPlaceholder = [...firstColumnPlaceholder, imageList[i]];
            firstColumnFilled = true;
          } else if (secondColumnFilled === false) {
            secondColumnPlaceholder = [
              ...secondColumnPlaceholder,
              imageList[i],
            ];
            secondColumnFilled = true;
          } else if (thirdColumnFilled === false) {
            thirdColumnPlaceholder = [...thirdColumnPlaceholder, imageList[i]];
            thirdColumnFilled = true;
          }
        } else if (columnSize === 4) {
          if (firstColumnFilled === false) {
            firstColumnPlaceholder = [...firstColumnPlaceholder, imageList[i]];
            firstColumnFilled = true;
          } else if (secondColumnFilled === false) {
            secondColumnPlaceholder = [
              ...secondColumnPlaceholder,
              imageList[i],
            ];
            secondColumnFilled = true;
          } else if (thirdColumnFilled === false) {
            thirdColumnPlaceholder = [...thirdColumnPlaceholder, imageList[i]];
            thirdColumnFilled = true;
          } else if (fourthColumnFilled === false) {
            fourthColumnPlaceholder = [
              ...fourthColumnPlaceholder,
              imageList[i],
            ];
            fourthColumnFilled = true;
          }
        }

        // reset columnFilled flag
        if (columnSize === 2 && secondColumnFilled === true) {
          firstColumnFilled = false;
          secondColumnFilled = false;
        } else if (columnSize === 3 && thirdColumnFilled === true) {
          firstColumnFilled = false;
          secondColumnFilled = false;
          thirdColumnFilled = false;
        } else if (columnSize === 4 && fourthColumnFilled === true) {
          firstColumnFilled = false;
          secondColumnFilled = false;
          thirdColumnFilled = false;
          fourthColumnFilled = false;
        }
      }

      setColumn([
        firstColumnPlaceholder,
        secondColumnPlaceholder,
        thirdColumnPlaceholder,
        fourthColumnPlaceholder,
      ]);
    };

    distributeImage();
  }, [columnSize, imageList]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let images = await imageServices.getAll(page);

        // No more data, removed bottom reference to avoid being rendered
        if (images.length === 0) {
          setImageList((prev) => prev.slice(0, prev.length - 1));
        } else {
          // Remove the previous bottomReference, add new images and add new bottomReference
          setImageList((prev) => [
            ...prev.slice(0, prev.length - 1),
            ...images,
            { id: "bottomReference" },
          ]);
        }

        setIsLoading(false);
      } catch (error) {
        // TODO: DO SOME ERROR INDICATION IF FAIL TO FETCH DATA
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  // Setup intersection observer
  useEffect(() => {
    const handleIntersection = (entries) => {
      let myEntry = entries[0];

      if (myEntry.isIntersecting && !isLoading) {
        setPage((prev) => prev + 1);
      }
    };

    const observer = new IntersectionObserver(handleIntersection);
    if (bottomRef.current) observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [isLoading]);

  const markupMapper = (curr) => {
    if (curr.id === "bottomReference") {
      return (
        <div
          className={styles.imageContainer + " " + styles.bottomReference}
          ref={bottomRef}
        ></div>
      );
    }

    return (
      <div className={styles.imageContainer}>
        <Link to={`/image/${curr.id}`}>
          <img src={curr.imageUrl} alt="" />
        </Link>
      </div>
    );
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryColumn}>{column[0].map(markupMapper)}</div>
      <div className={styles.galleryColumn}>{column[1].map(markupMapper)}</div>
      <div className={styles.galleryColumn + " " + styles.thirdColumn}>
        {column[2].map(markupMapper)}
      </div>
      <div className={styles.galleryColumn + " " + styles.fourthColumn}>
        {column[3].map(markupMapper)}
      </div>
    </div>
  );
};

export default Gallery;
