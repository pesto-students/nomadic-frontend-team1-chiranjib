import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

//importing styles
import styles from "./styles.module.css";

//importing MUI
import { Grid } from "@mui/material";

//importing other components
import Loader from "../../common/loader";
import CardWithImage from "../../common/cardWithImage";

//importing images
import roomsImage from "../../../public/images/sofa.png";
import { getBookingsAdmin } from "../../../actions/propertyAction";

//importing toastr
import { toast } from "react-toastify";

const OrderCards = ({ getBookingsAdmin }) => {
  const [loading, setLoading] = useState(false);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);

  useEffect(() => {
    setBookingsEmpty();
    getBookingsHandler();
  }, []);

  const navigate = useNavigate();

  const getBookingsHandler = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user._id && user.name && localStorage.getItem("authToken")) {
      setLoading(true);

      const bookingsResponse = await getBookingsAdmin(user._id);
      if (
        bookingsResponse.status === "success" &&
        bookingsResponse.data.bookings.length > 0
      ) {
        bookingsResponse.data.bookings.forEach((booking) => {
          if (new Date(booking.startDate) > new Date()) {
            setUpcomingBookings((prev) => [
              ...prev,
              <Fragment key={booking._id}>
                <CardWithImage
                  className={styles["orders-card-container"]}
                  classNameImage={styles["orders-card-conatiner__left"]}
                  image={booking.rentalID.originalImages[0]}
                >
                  <Grid container spacing={2} className={styles["orders-card"]}>
                    <Grid
                      className={`${styles["orders-card-left"]} ${styles["card-item"]}`}
                      item
                      xs={12}
                      md={8}
                    >
                      <div className={styles["property-name"]}>
                        {booking.rentalID.rentalName}
                        <span
                          className={`${styles["text-thin"]} ${styles["margin-left"]}`}
                        >
                          {booking.rentalID.subDestination},{" "}
                          {booking.rentalID.state}
                        </span>
                      </div>
                      <div className={styles["rooms-row"]}>
                        <img
                          className={styles["rooms-image"]}
                          src={roomsImage}
                          alt="nomadic"
                        />
                        <span
                          className={`${styles["text-thin"]} ${styles["margin-left"]}`}
                        >
                          {booking.rentalID.noOfPeopleAccomodate} rooms
                        </span>
                      </div>
                    </Grid>
                    <Grid
                      className={`${styles["orders-card-right"]} ${styles["card-item"]}`}
                      item
                      xs={12}
                      md={4}
                    >
                      <div className={styles["orders-time"]}>
                        {booking.userID.name}
                        <div className={`${styles["phone"]}`}>
                          {booking.userID.email}
                        </div>
                      </div>
                      <div className={styles["orders-time"]}>
                        {new Date(booking.startDate).toLocaleDateString(
                          "en-GB"
                        )}{" "}
                        -{" "}
                        {new Date(booking.endDate).toLocaleDateString("en-GB")}
                      </div>
                      <div
                        className={`${styles["rooms-row"]} ${styles["price"]} `}
                      >
                        Booked for ₹{booking.rentalID.price.toLocaleString()}
                      </div>
                    </Grid>
                  </Grid>
                </CardWithImage>
              </Fragment>,
            ]);
          } else {
            setPastBookings((prev) => [
              ...prev,
              <Fragment key={booking._id}>
                <CardWithImage
                  image={booking.rentalID.originalImages[0]}
                  className={`${styles["orders-past"]} ${styles["orders-card-container"]}`}
                  classNameImage={styles["orders-card-conatiner__left"]}
                >
                  <Grid container spacing={2} className={styles["orders-card"]}>
                    <Grid
                      className={`${styles["orders-card-left"]} ${styles["card-item"]}`}
                      item
                      xs={12}
                      md={8}
                    >
                      <div className={styles["property-name"]}>
                        {booking.rentalID.rentalName}
                        <span
                          className={`${styles["text-thin"]} ${styles["margin-left"]}`}
                        >
                          {booking.rentalID.subDestination},{" "}
                          {booking.rentalID.state}
                        </span>
                      </div>
                      <div className={styles["rooms-row"]}>
                        <img
                          className={styles["rooms-image"]}
                          src={roomsImage}
                          alt="nomadic"
                        />
                        <span
                          className={`${styles["text-thin"]} ${styles["margin-left"]}`}
                        >
                          {booking.rentalID.noOfPeopleAccomodate} rooms
                        </span>
                      </div>
                    </Grid>
                    <Grid
                      className={`${styles["orders-card-right"]} ${styles["card-item"]}`}
                      item
                      xs={12}
                      md={4}
                    >
                      <div className={styles["orders-time"]}>
                        {booking.userID.name}
                        <div className={`${styles["phone"]}`}>
                          {booking.userID.email}
                        </div>
                      </div>
                      <div className={styles["orders-time"]}>
                        {new Date(booking.startDate).toLocaleDateString(
                          "en-GB"
                        )}{" "}
                        -{" "}
                        {new Date(booking.endDate).toLocaleDateString("en-GB")}
                      </div>
                      <div
                        className={`${styles["rooms-row"]} ${styles["price"]} `}
                      >
                        Booked for ₹{booking.rentalID.price.toLocaleString()}
                      </div>
                    </Grid>
                  </Grid>
                </CardWithImage>
              </Fragment>,
            ]);
          }
        });
      } else {
        setBookingsEmpty();
        toast.error("No Orders found!");
      }

      setLoading(false);
    } else {
      toast.error("Please Login!");
      navigate("/dashboard");
    }
  };

  const setBookingsEmpty = () => {
    setUpcomingBookings([]);
    setPastBookings([]);
  };

  return (
    <>
      {loading && <Loader />}
      <div className={styles["orders-container"]}>
        <div className={styles["title"]}>Upcoming Orders</div>
        {upcomingBookings.map((booking) => booking)}
        {upcomingBookings.length===0 && <div className={styles["no-orders-found"]} >No Orders found!</div>}

        <div className={`${styles["title"]} ${styles["title-margin"]}`}>
          Past Orders
        </div>
        {pastBookings.map((booking) => booking)}
        {pastBookings.length===0 && <div className={styles["no-orders-found"]} >No Orders found!</div>}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
});

export default connect(mapStateToProps, { getBookingsAdmin })(OrderCards);
