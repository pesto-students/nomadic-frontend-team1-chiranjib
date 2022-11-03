import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

//importing styles
import styles from "./styles.module.css";

//importing MUI
import { Grid } from "@mui/material";

//importing other components
import Loader from "../../common/loader";
import ButtonComponent from "../../common/button";
import ModalComponent from "../../common/modal";
import SuccessModal from "../../common/successModal";

//importing images
import CardWithImage from "../../common/cardWithImage";
import roomsImage from "../../../public/images/sofa.png";

//importing toastr
import { toast } from "react-toastify";

import { getBookings, cancelBookings } from "../../../actions/propertyAction";

const BookingCards = ({ getBookings, cancelBookings }) => {
  const [loading, setLoading] = useState(false);
  const [rawBookingsData, setRawBookingsData] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [confirmCancelModal, setConfirmCancelModal] = useState(false);
  const [cancelId, setCancelId] = useState("");
  const [successModal, setSuccessModal] = useState(false);

  useEffect(() => {
    setBookingsEmpty();
    getBookingsHandler();
  }, []);

  useEffect(() => {
    setPastBookings([]);
    setUpcomingBookings([]);
    rawBookingsData.forEach((booking) => {
      if (new Date(booking.startDate) > new Date()) {
        setUpcomingBookings((prev) => [
          ...prev,
          <Fragment key={booking._id}>
            <CardWithImage image={booking.rentalID.originalImages[0]}>
              <Grid container spacing={2} className={styles["bookings-card"]}>
                <Grid
                  className={`${styles["bookings-card-left"]} ${styles["card-item"]}`}
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
                    <img className={styles["rooms-image"]} src={roomsImage} alt="Rooms image"/>
                    <span
                      className={`${styles["text-thin"]} ${styles["margin-left"]}`}
                    >
                      {booking.rentalID.noOfPeopleAccomodate} rooms
                    </span>
                  </div>
                  <div className={`${styles["rooms-row"]} ${styles["date"]} `}>
                    <span
                      className={`${styles["text-thin"]} ${styles["margin-right"]}`}
                    >
                      From
                    </span>
                    {new Date(booking.startDate).toLocaleDateString("en-GB")} -{" "}
                    {new Date(booking.endDate).toLocaleDateString("en-GB")}
                  </div>
                  <div className={`${styles["rooms-row"]} ${styles["price"]} `}>
                    Booked for ₹{booking.rentalID.price.toLocaleString()}
                  </div>
                </Grid>
                <Grid
                  className={`${styles["bookings-card-right"]} ${styles["card-item"]}`}
                  item
                  xs={12}
                  md={4}
                >
                  <div className={styles["bookings-time"]}>
                    Check-in Time 11 am
                  </div>
                  {!booking.isCancelled && (
                    <ButtonComponent
                      className={styles["bookings-button"]}
                      onClick={setCancelBookingHandler.bind(null, booking._id)}
                    >
                      Cancel Booking
                    </ButtonComponent>
                  )}
                  {booking.isCancelled && (
                    <ButtonComponent
                      className={styles["bookings-button"]}
                      disabled={true}
                    >
                      Cancelled Booking
                    </ButtonComponent>
                  )}
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
              className={styles["bookings-past"]}
            >
              <Grid container spacing={2} className={styles["bookings-card"]}>
                <Grid
                  className={`${styles["bookings-card-left"]} ${styles["card-item"]}`}
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
                    <img className={styles["rooms-image"]} src={roomsImage} alt="Rooms image"/>
                    <span
                      className={`${styles["text-thin"]} ${styles["margin-left"]}`}
                    >
                      {booking.rentalID.noOfPeopleAccomodate} rooms
                    </span>
                  </div>
                  <div className={`${styles["rooms-row"]} ${styles["date"]} `}>
                    <span
                      className={`${styles["text-thin"]} ${styles["margin-right"]}`}
                    >
                      From
                    </span>
                    {new Date(booking.startDate).toLocaleDateString("en-GB")} -{" "}
                    {new Date(booking.endDate).toLocaleDateString("en-GB")}
                  </div>
                  <div className={`${styles["rooms-row"]} ${styles["price"]} `}>
                    Booked for ₹{booking.rentalID.price.toLocaleString()}
                  </div>
                </Grid>
                <Grid
                  className={`${styles["bookings-card-right"]} ${styles["card-item"]}`}
                  item
                  xs={12}
                  md={4}
                >
                  <div className={styles["bookings-time"]}>
                    Check-in Time 11 am
                  </div>
                  <ButtonComponent
                    className={`${styles["bookings-button"]} ${
                      booking.isCancelled
                        ? styles["danger-button"]
                        : styles["success-button"]
                    }`}
                  >
                    {booking.isCancelled
                      ? "Cancelled Booking"
                      : "Previous Stay"}
                  </ButtonComponent>
                </Grid>
              </Grid>
            </CardWithImage>
          </Fragment>,
        ]);
      }
    });
  }, [rawBookingsData]);

  const navigate = useNavigate();

  const getBookingsHandler = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user._id && user.name && localStorage.getItem("authToken")) {
      setLoading(true);

      const bookingsResponse = await getBookings(user._id);
      if (
        bookingsResponse.status === "success" &&
        bookingsResponse.data.bookings.length > 0
      ) {
        setRawBookingsData(bookingsResponse.data.bookings);
      } else {
        setBookingsEmpty();
        toast.error("No bookings found!");
      }

      setLoading(false);
    } else {
      toast.error("Please Login!");
      navigate("/dashboard");
    }
  };

  const setCancelBookingHandler = (id) => {
    setConfirmCancelModal(true);
    setCancelId(id);
  };

  const closeModal = () => {
    setConfirmCancelModal(false);
    setCancelId("");
  };

  const cancelBookingHandler = async () => {
    setLoading(true);
    const bookingsResponse = await cancelBookings(cancelId);

    if (
      bookingsResponse.status === "success" &&
      bookingsResponse.data.booking._id
    ) {
      let tempRawBooking = [...rawBookingsData];
      tempRawBooking[
        tempRawBooking.findIndex((booking) => booking._id === cancelId)
      ].isCancelled = true;
      setRawBookingsData(tempRawBooking);

      // toast.success("Successfully cancelled Booking");
      closeModal();
      setSuccessModal(true);
    } else {
      let errorMessage = bookingsResponse.message
        ? bookingsResponse.message
        : "Error Occurred!";
      toast.error(errorMessage);
      closeModal();
    }

    setLoading(false);
  };

  const setBookingsEmpty = () => {
    setUpcomingBookings([]);
    setPastBookings([]);
  };

  return (
    <>
      {loading && <Loader />}
      {successModal && (
        <SuccessModal
          mainTitle="Booking Cancelled !"
          subTitle="Your payment will be refunded in next 7 days!"
          onClick={() => setSuccessModal(false)}
        />
      )}
      {confirmCancelModal && (
        <ModalComponent className={styles["modal-padding"]}>
          <div className={styles["modal-text"]}>
            Are you sure <br />
            you want to cancel?
          </div>
          <div className={styles["modal-buttons"]}>
            <ButtonComponent
              className={`${styles["bookings-button"]} ${styles["danger-button"]}`}
              onClick={cancelBookingHandler}
            >
              Confirm
            </ButtonComponent>
            <ButtonComponent
              className={`${styles["bookings-button"]} ${styles["success-button"]}`}
              onClick={closeModal}
            >
              Cancel
            </ButtonComponent>
          </div>
        </ModalComponent>
      )}
      <div className={styles["bookings-container"]}>
        <div className={styles["title"]}>My Bookings</div>
        {upcomingBookings.map((booking) => booking)}
        {upcomingBookings.length===0 && <div className={styles["no-bookings-found"]} >No Bookings found!</div>}
        <div className={`${styles["title"]} ${styles["title-margin"]}`}>
          Past Bookings
        </div>
        {pastBookings.map((booking) => booking)}
        {pastBookings.length===0 && <div className={styles["no-bookings-found"]} >No Bookings found!</div>}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
});

export default connect(mapStateToProps, { getBookings, cancelBookings })(
  BookingCards
);
