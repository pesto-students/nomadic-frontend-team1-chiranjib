import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

//importing styles
import styles from "./styles.module.css";

//importing MUI
import { Grid } from "@mui/material";

//importing images
import roomsImage from "../../../public/images/sofa.png";

//importing other components
import Loader from "../../common/loader";
import CardWithImage from "../../common/cardWithImage";
import ButtonComponent from "../../common/button";

import { getProperties } from "../../../actions/propertyAction";

//importing toastr
import { toast } from "react-toastify";

const MyPropertiesCards = ({getProperties}) => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    setProperties([]);
    getPropertiesHandler();
  }, []);

  const navigate = useNavigate();

  const getPropertiesHandler = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user._id && user.name && localStorage.getItem("authToken")) {
      setLoading(true);

      const propertiesResponse = await getProperties(user._id);
      if (
        propertiesResponse.status === "success" &&
        propertiesResponse.data.rental.length > 0
      ) {
        propertiesResponse.data.rental.forEach((rental) => {
          setProperties((prev) => [
            ...prev,
            <Fragment key={rental._id}>
              <CardWithImage 
               className={styles["properties-card-container"]}
               classNameImage={styles["properties-card-conatiner__left"]}
              image={rental.originalImages[0]}>
                <Grid
                  container
                  spacing={2}
                  className={styles["properties-card"]}
                >
                  <Grid
                    className={`${styles["properties-card-left"]} ${styles["card-item"]}`}
                    item
                    xs={12}
                    md={8}
                  >
                    <div className={styles["property-name"]}>
                    {rental.rentalName}
                      <span
                        className={`${styles["text-thin"]} ${styles["margin-left"]}`}
                      >
                       {rental.district}, {rental.state}
                      </span>
                    </div>
                    <div className={styles["rooms-row"]}>
                      <img className={styles["rooms-image"]} src={roomsImage}  alt="nomadic"/>
                      <span
                        className={`${styles["text-thin"]} ${styles["margin-left"]}`}
                      >
                        {rental.noOfPeopleAccomodate} rooms
                      </span>
                    </div>
                  </Grid>
                  <Grid
                    className={`${styles["properties-card-right"]} ${styles["card-item"]}`}
                    item
                    xs={12}
                    md={4}
                  >
                    <div className={styles["properties-time"]}>
                      Check-in Time 11 am
                    </div>
                    <ButtonComponent 
                    className={styles["properties-button"]}
                    onClick={()=>navigate(`/property/${rental._id}`)}
                    >
                      Edit Rental
                    </ButtonComponent>
                  </Grid>
                </Grid>
              </CardWithImage>
            </Fragment>,
          ]);
        });
      } else {
        setProperties([]);
        toast.error("No Properties found!");
      }

      setLoading(false);
    } else {
      toast.error("Please Login!");
      navigate("/dashboard");
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className={styles["properties-container"]}>
        <div className={styles["title"]}>My Rentals</div>

        {properties.map((rental) => rental)}
        {properties.length===0 && <div className={styles["no-rentals-found"]} >No Rental found!</div>}
        <ButtonComponent
          className={`${styles["properties-button"]} ${styles["add-property"]}`}
          onClick={()=>navigate("/property/add")}
        >
          Add Rental
        </ButtonComponent>
      </div>
    </>
  );
};


const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
});

export default connect(mapStateToProps, {getProperties  })(MyPropertiesCards);
