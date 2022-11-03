import React from "react";

//importing sytles
import styles from "./styles.module.css";

//importing images
import CancelIcon from '@mui/icons-material/Cancel';

// Rendering individual images
const Image = ({ image,index,removeImage }) => {
  return (
    <div className={styles["file-item"]}>
      <img
        alt={`img - ${image.id}`}
        src={image.src}
        className="file-img"
      />
      <CancelIcon 
      style={{color:"#ff0040"}}
      className={styles["cancel-icon"]}
      onClick={removeImage.bind(null,index)}
      />
    </div>
  );
};

const AddedImage = ({ image,index,removeImage }) => {
  return (
    <div className={styles["file-item"]}>
      <img
        alt={`img - ${image}`}
        src={image}
        className="file-img"
      />
      <CancelIcon 
      style={{color:"#ff0040"}}
      className={styles["cancel-icon"]}
      onClick={removeImage.bind(null,index)}
      />
    </div>
  );
};

// ImageList Component//
const ImageGrid = ({ images,removeImage,addedImage,removeAddedImage }) => {
  // render each image by calling Image component
  const renderImage = (image, index) => {
    return <Image 
    image={image} 
    index={index}
    removeImage={removeImage}
    key={`${image.id}-image`} />;
  };

  const renderAddedImage = (image, index) => {
    return <AddedImage 
    image={image} 
    index={index}
    removeImage={removeAddedImage}
    key={`${image}${index}-image`} />;
  }

  // Return the list of files//
  return (
    <section className={`${styles["file-list"]}`}>
      {addedImage.map(renderAddedImage)}
      {images.map(renderImage)}
      
      </section>
  );
};

export default ImageGrid;