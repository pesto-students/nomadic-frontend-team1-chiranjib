import React from "react";



//importing images
import profile from "../../../../public/images/profile.png";

//importing styles
import styles from "./styles.module.css";

const Rating = ({review}) => {
  return (
    <div className={styles["rating"]}>
      <div className={styles["user-grid"]}>
        <img src={profile}  alt="nomadic"/>
        <div className={styles["user-name_date"]}>
          <span className={styles["user-name"]}>{review.name}</span>
          <div className={styles["user-date"]}>{review.date}</div>
        </div>
      </div>
      <div className={styles["user-review"]}>
      {review.review}
      </div>
    </div>
  );
};

export default Rating;
