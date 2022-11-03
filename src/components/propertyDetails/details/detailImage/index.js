import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

//importing styles
import styles from "./styles.module.css";
import "./styles.css";

const DetailImage = ({ displayProperty }) => {
  const { originalImages } = displayProperty;
  const [propertyImages, setPropertyImages] = useState("");

  useEffect(() => {
    if (originalImages && originalImages.length > 0) {
      setPropertyImages(
        originalImages.map((image,index) => {
          return (
            <div key={image + index} className={styles["detail-image"]}>
              <img src={image} />
            </div>
          );
        })
      );
    }
  }, [originalImages]);

  return (
    <>
      <Carousel
        showThumbs={false}
        showStatus={false}
        className={styles["image-container"]}
        showIndicators={false}
      >
        {propertyImages}
      </Carousel>
    </>
  );
};

export default DetailImage;
