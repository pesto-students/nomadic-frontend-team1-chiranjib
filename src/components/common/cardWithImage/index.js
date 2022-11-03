import { Grid } from "@mui/material";
import React from "react";

//importing styles
import styles from "./styles.module.css";

const CardWithImage = (props) => {
  return (
    <>
      <Grid container spacing={2} className={`${styles["bookings-card"]} ${props.className}`}>
        <Grid className={`${styles["bookings-grid-item"]} ${props.classNameImage}`} item xs={12} md={3}>
          <img src={props.image} alt="Nomadic"/>
        </Grid>
        <Grid className={styles["bookings-grid-item-right"]} item xs={12} md={9}>
          <>{props.children}</>
        </Grid>
      </Grid>
    </>
  );
};

export default CardWithImage;
