import React from "react";
import Rating from "./rating";

//importing styles
import styles from "./styles.module.css";

//importing MUI
import Grid from "@mui/material/Grid";

const ReviewSection = ({displayProperty}) => {
  return (
    <div>
      <Grid
        sx={{ flexGrow: 1 }}
        container
        spacing={2}
        className={styles["reviews-grid"]}
      >
        {displayProperty.userReview && displayProperty.userReview.length >0 && displayProperty.userReview.map((review,index)=>{
            return  <Grid key={review.name+index} item md={6} xs={12}>
            <Rating 
            review={review}
            />
          </Grid>
        })}
       
       
      </Grid>
    </div>
  );
};

export default ReviewSection;
