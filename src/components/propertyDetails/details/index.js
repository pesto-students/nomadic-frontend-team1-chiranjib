import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

//importing styles
import styles from "./styles.module.css";

//importing components
import Loader from "../../common/loader";
import DetailImage from "./detailImage";
import LeftSection from "./leftSection";
import TopSection from "./topSection";
import ReviewSection from "./reviewSection";

//importing MUI
import Grid from "@mui/material/Grid";
import RightSection from "./rightSection";
import StarIcon from "@mui/icons-material/Star";

//importing actions
import { getPropertyById } from "../../../actions/propertyAction";

//importing toastr
import { toast } from "react-toastify";

//importing images
import serviceImage1 from "../../../public/images/service1.webp";
import serviceImage2 from "../../../public/images/service2.webp";
import serviceImage3 from "../../../public/images/service3.webp";

import { constants } from "../../../utils/constants";

const Details = ({ getPropertyById }) => {
  const [loading, setLoading] = useState(false);
  const [displayProperty, setDisplayProperty] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPropertyHandler();
  }, []);

  const getPropertyHandler = async () => {
    setLoading(true);

    const propertyDetails = await getPropertyById(params.id);
    if (propertyDetails.status === "success" && propertyDetails.data.rental) {
      setDisplayProperty(propertyDetails.data.rental);
    } else {
      toast.error("Property Not found");
      navigate("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className={styles["details"]}>
      {loading && <Loader />}
      <Grid
        container
        spacing={2}
        className={`${styles["details-grid"]} ${styles["top-grid"]}`}
      >
        <TopSection displayProperty={displayProperty ? displayProperty : {}} />
      </Grid>
      <DetailImage displayProperty={displayProperty ? displayProperty : {}} />
      <Grid container spacing={2} className={styles["details-grid"]}>
        <Grid className={styles["details-grid-item"]} item xs={12} md={8}>
          <LeftSection
            displayProperty={displayProperty ? displayProperty : {}}
          />
        </Grid>
        <Grid className={styles["details-grid-item"]} item xs={12} md={4}>
          <div>
            <RightSection
              displayProperty={displayProperty ? displayProperty : {}}
            />
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={styles["services-grid"]}>
        <div className={styles["services-title"]}>
          Every Rental is inspected in person for quality
        </div>
        <div className={styles["services-items"]}>
          <div className={styles["services-item"]}>
            <img src={serviceImage1}  alt="nomadic"/>
            <div className={styles["services-info"]}>Always fully equipped</div>
          </div>
          <div className={styles["services-item"]}>
            <img src={serviceImage2}  alt="nomadic"/>
            <div className={styles["services-info"]}>One-of-a-kind details</div>
          </div>
          <div className={styles["services-item"]}>
            <img src={serviceImage3}  alt="nomadic"/>
            <div className={styles["services-info"]}>
              Exceptional hospitality
            </div>
          </div>
        </div>
      </Grid>
      <Grid container spacing={2} className={styles["amenities-grid"]}>
        <div className={styles["amenities-title"]}>Amenities</div>
        <Grid
          sx={{ flexGrow: 1 }}
          container
          spacing={2}
          className={styles["amenities-items"]}
        >
          {displayProperty.amenities &&
            displayProperty.amenities.length > 0 &&
            displayProperty.amenities.map((amenity) => {
              return (
                constants.AMENITIES_LIST.includes(amenity) && <Grid key={amenity} item md={3} xs={6}>
                  <div className={styles["amenities-item"]}>
                    <img
                      className={styles["amenities-image"]}
                      src={require(`../../../public/images/amenities/${amenity}.png`)}
                      alt="nomadic"
                    />
                    <span>{amenity}</span>
                  </div>
                </Grid>
              );
            })}
        </Grid>
      </Grid>
      <Grid container spacing={2} className={styles["ratings-grid"]}>
        <div className={styles["ratings-title"]}>
          {" "}
          <StarIcon />
          <span>{displayProperty.avgReview} ({displayProperty.noOfReview} reviews)</span>
        </div>
        <ReviewSection 
        displayProperty={displayProperty ? displayProperty : {}}
        />
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
});

export default connect(mapStateToProps, { getPropertyById })(Details);
