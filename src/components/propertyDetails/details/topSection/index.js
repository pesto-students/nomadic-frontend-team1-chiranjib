import React from "react";

//importing styles
import styles from "./styles.module.css";

//importing MUI
import StarIcon from "@mui/icons-material/Star";

const TopSection = ({ displayProperty }) => {
  const { rentalName, streetName, state } =
    displayProperty;
  return (
    <section className={styles["top-section"]}>
      <div className={styles["property-name"]}>{rentalName}</div>
      <div className={styles["property-info"]}>
        <div className={styles["ratings"]}>
          <StarIcon />
          <span>{displayProperty.avgReview}</span>
        </div>
        <div className={styles["dot"]}>.</div>
        <div className={styles["reviews"]}>
          <div className={styles["reviews-box"]}>
            <span>{displayProperty.noOfReview} </span> reviews
          </div>
        </div>
        <div className={styles["dot"]}>.</div>
        <div className={styles["reviews"]}>
        
          {streetName}, {state}
        
        </div>
      </div>
    </section>
  );
};

export default TopSection;
