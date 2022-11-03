import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

//importing styles
import styles from "./styles.module.css";

//importing MUI
import { Grid } from "@mui/material";

//importing other components
import Loader from "../../common/loader";
import CardWithImage from "../../common/cardWithImage";
import ButtonComponent from "../../common/button";

//importing images
import roomsImage from "../../../public/images/sofa.png";

//importing Actions
import { getWishlist,removeWishlist } from "../../../actions/propertyAction";

//importing toaster
import { toast } from "react-toastify";

const WishlistCards = ({ propertyState, getWishlist,removeWishlist }) => {
  const [loading, setLoading] = useState(false);
  const [listRawData, setListRawData] = useState([])
  const [list, setList] = useState([]);

  useEffect(() => {
    setList([]);
    setListRawData([])
    getWishlistHandler();
  }, []);

  useEffect(() => {
    listRawData.forEach((list) => {
      setList((prev) => [
        ...prev,
        <Fragment key={list._id}>
          <CardWithImage 
            className={styles["wishlist-card-container"]}
            classNameImage={styles["wishlist-card-conatiner__left"]}
          image={list.rentalId.originalImages[0]}
          >
            <Grid container spacing={2} className={styles["wishlist-card"]}>
              <Grid
                className={`${styles["wishlist-card-left"]} ${styles["card-item"]}`}
                item
                xs={12}
                md={7}
              >
                <div className={styles["property-name"]}>
                  {list.rentalId.rentalName}
                  <span
                    className={`${styles["text-thin"]} ${styles["margin-left"]}`}
                  >
                    {list.rentalId.subDestination}, {list.rentalId.state}
                  </span>
                </div>
                <div className={styles["rooms-row"]}>
                  <img className={styles["rooms-image"]} src={roomsImage}  alt="nomadic"/>
                  <span
                    className={`${styles["text-thin"]} ${styles["margin-left"]}`}
                  >
                    {list.rentalId.noOfPeopleAccomodate} rooms
                  </span>
                </div>
              </Grid>
              <Grid
                className={`${styles["wishlist-card-right"]} ${styles["card-item"]}`}
                item
                xs={12}
                md={5}
              >
                <div className={styles["wishlist-time"]}>
                  Check-in Time 11 am
                </div>
                <div className={styles["wishlist-buttons"]}>
                  <ButtonComponent
                    className={`${styles["wishlist-button"]} ${styles["danger-button"]}`}
                    onClick={removeWishlistHandler.bind(null,list._id)}
                  >
                    Remove
                  </ButtonComponent>

                  <ButtonComponent 
                  className={styles["wishlist-button"]}
                  onClick={()=>navigate(`/property-details/${list.rentalId._id}`)}
                  >
                    Book Now
                  </ButtonComponent>
                </div>
              </Grid>
            </Grid>
          </CardWithImage>
        </Fragment>,
      ]);
    });

  }, [listRawData])
  

  const navigate = useNavigate();

  const getWishlistHandler = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user._id && user.name && localStorage.getItem("authToken")) {
      setLoading(true);
      
      const wishlistResponse = await getWishlist(user._id);
      if (
        wishlistResponse.status === "success" &&
        wishlistResponse.data.allWishlist.length > 0
      ) {
        setList([]);
        setListRawData(wishlistResponse.data.allWishlist);
      } else {
        setListRawData([])
        setList([]);
      }

      setLoading(false);
    } else {
      toast.error("Please Login!");
      navigate("/dashboard");
    }
  };

  const removeWishlistHandler =async (id) =>{
    setLoading(true);
    const wishlistResponse = await removeWishlist(id);
    if (
      wishlistResponse==''
    ) {
      setList([]);
      setListRawData(listRawData.filter((list)=>list._id!==id));
    } 

    setLoading(false);
  }

  return (
    <>
      {loading && <Loader />}
      <div className={styles["wishlist-container"]}>
        <div className={styles["title"]}>My Wishlist</div>
        {list}
        {listRawData.length === 0 && <div className={styles["no-rentals-found"]} >No Rentals found!</div> }
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
});

export default connect(mapStateToProps, { getWishlist,removeWishlist })(WishlistCards);

export {WishlistCards as Wishlist}