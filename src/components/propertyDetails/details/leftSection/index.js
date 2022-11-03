import React, { useEffect, useState } from "react";

//importing styles
import styles from "./styles.module.css";


const LeftSection = ({ displayProperty }) => {
  // const [amenitiesGrid, setAmenitiesGrid] = useState("");
  const { amenities, overview } =
    displayProperty;

  // useEffect(() => {
  //   if (amenities && amenities.length > 0) {
  //     setAmenitiesGrid(
  //       amenities.map((amenity) => {
  //         return (
  //           <Grid
  //             key={amenity}
  //             className={styles["amenities-option"]}
  //             item
  //             xs={6}
  //             md={6}
  //           >
  //             <div>
  //               <i className={`fa ${styles["fa-margin"]} fa-anchor`}></i>
  //               {amenity}
  //             </div>
  //           </Grid>
  //         );
  //       })
  //     );
  //   }
  // }, [amenities]);

  return (
    <>
      {/* <div className={styles["property-name"]}>{rentalName}</div> */}

      {/* <section id="amenities" className={styles["amenities"]}>
        <div className={styles["amenities-rooms"]}>
          {noOfPeopleAccomodate} guests
        </div>
        <div className={styles["title"]}>What this place offers</div>
        <Grid className={styles["amenities-options"]} container spacing={2}>
          {amenitiesGrid}
        </Grid>
      </section> */}
      <section id="overview" className={styles["overview"]}>
        <div className={styles["title"]}>Overview</div>
        <div className={styles["info"]}>{overview}</div>
      </section>
    </>
  );
};

export default LeftSection;
