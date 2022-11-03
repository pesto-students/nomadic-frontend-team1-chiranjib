import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

//importing MUI
import { CardContent } from "@mui/material";
import Grid from "@mui/material/Grid";

//importing styles
import styles from "./styles.module.css";

//importing images
import heartIconUnfilled from "../../../../public/images/heart-icon-unfilled.svg";
import heart from "../../../../public/images/heart.png";
import roomsImage from "../../../../public/images/sofa.png";

//importing toastr
import { toast } from "react-toastify";

//importing actions
import { addToWishlist } from "../../../../actions/propertyAction";
import Loader from "../../../common/loader";

const DashboardItem = ({ property, propertyState,addToWishlist }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const addToWishlistHandler = async () => {
    if (user && user._id && user.name && localStorage.getItem("authToken")) {
      if (
        !propertyState.wishlist.find(
          (wishlistItem) => wishlistItem.rentalId === property._id
        )
      ) {

        setLoading(true);
        await addToWishlist(user._id,property._id);
        setLoading(false);
        toast.success(`${property.rentalName} wishlisted!`);

      }
    } else {
      toast.error("Please login!");
    }
  };

  return (
    <>
     {loading && <Loader />}
      <Grid className={styles["card-grid"]} item lg={4} sm={6} xs={12}>
        <CardContent className={styles["card"]}>
          <Grid container className={styles["item-container"]}>
            <Grid
              onClick={navigate.bind(null, `/property-details/${property._id}`)}
              item
              md={6}
              xs={12}
              padding={0}
            >
              {property.thumbnailImages && property.thumbnailImages.length > 0 && (
                <div className={styles["card-image-section"]}>
                  <img
                    className={styles["main-image"]}
                    src={property.thumbnailImages[0]}
                    alt="Property"
                  />
                </div>
              )}
            </Grid>
            <Grid item md={6} xs={12} padding={0} className={styles["info"]}>
              <section className={styles["info-top"]}>
                <div className={styles["info-heading"]}>
                  <span
                    onClick={navigate.bind(
                      null,
                      `/property-details/${property._id}`
                    )}
                  >
                    {property.rentalName}
                  </span>
                  <img
                    src={
                      propertyState.wishlist.find(
                        (wishlistItem) => wishlistItem.rentalId === property._id
                      )
                        ? heart
                        : heartIconUnfilled
                    }
                    alt="Wishlist"
                    className={
                      propertyState.wishlist.find(
                        (wishlistItem) => wishlistItem.rentalId === property._id
                      )
                        ? styles["heart-filled"]
                        : styles["heart-unfilled"]
                    }
                    onClick={addToWishlistHandler}
                  />
                </div>
                <div className={styles["info-sub-heading"]}>
                  {property.streetName}
                </div>
                <div
                  className={styles["info-rooms"]}
                  onClick={navigate.bind(
                    null,
                    `/property-details/${property._id}`
                  )}
                >
                  <img
                    className={styles["rooms-image"]}
                    src={roomsImage}
                    alt="Rooms"
                  />
                  {property.noOfPeopleAccomodate} rooms
                </div>
              </section>
              <section
                className={styles["info-bottom"]}
                onClick={navigate.bind(
                  null,
                  `/property-details/${property._id}`
                )}
              >
                <div className={styles["info-price"]}>
                  ₹{property.price.toLocaleString()} / day
                </div>
              </section>
            </Grid>
          </Grid>
        </CardContent>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
});

export default connect(mapStateToProps, {addToWishlist})(DashboardItem);
