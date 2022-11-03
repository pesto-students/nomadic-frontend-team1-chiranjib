import { constants } from "../utils/constants";
import { Apicall } from "./methods";

const serialize = function (obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      if (obj[p] != "") {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
  return str.join("&");
};

export const getAllPropertiesService = async (skip, limit, filters) => {
  const serializedFilter = serialize(filters);
  return await Apicall(
    `${constants.BACKEND_URL}/v1/rental?page=${skip}&limit=${limit}&${serializedFilter}`,
    "GET",
    {}
  );
};

export const getSearchPropertiesService = async (skip, limit, filters) => {
  const filter = { data: filters.search, ...filters };
  const serializedFilter = serialize(filter);
  return await Apicall(
    `${constants.BACKEND_URL}/v1/rental/search?page=${skip}&limit=${limit}&${serializedFilter}`,
    "GET",
    {}
  );
};

export const getPropertyByIdService = async (id) => {
  return await Apicall(`${constants.BACKEND_URL}/v1/rental/${id}`, "GET", {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  });
};

export const getBookingsService = async (id) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/booking/getAllBookingUser/${id}`,
    "GET",
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    }
  );
};

export const getBookingsServiceAdmin = async (id) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/booking/getAllBookingAdmin/${id}`,
    "GET",
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    }
  );
};

export const getPropertiesService = async (id) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/rental/owner/${id}`,
    "GET",
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    }
  );
};

export const getWishlistService = async (id) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/wishlist/getWishlistData/${id}`,
    "GET",
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    }
  );
};

export const removeWishlistService = async (id) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/wishlist/deleteWishlist/${id}`,
    "DELETE",
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    }
  );
};

export const cancelBookingsService = async (id) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/booking/cancelBooking/${id}`,
    "PATCH",
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    { isCancelled: true }
  );
};

export const getWishlistProductsWithoutDetailsService = async (id) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/wishlist/getWishlist/${id}`,
    "GET",
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    {}
  );
};

export const addToWishlistService = async (userId, rentalId) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/wishlist/addwishlist`,
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    { userId, rentalId }
  );
};

export const uploadImageService = async (file) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/upload`,
    "POST",
    { "Content-Type": "multipart/form-data" },
    { file }
  );
};

export const addRentalService = async ({
  rentalName,
  destination,
  subDestination,
  noOfPeopleAccomodate,
  price,
  houseType,
  amenities,
  overview,
  address,
  streetName,
  district,
  state,
  originalImages,
  thumbnailImages,
  ownerId,
}) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/rental/addRental`,
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    {
      rentalName,
      destination,
      subDestination,
      noOfPeopleAccomodate,
      price,
      houseType,
      amenities,
      overview,
      address,
      streetName,
      district,
      state,
      originalImages,
      thumbnailImages,
      ownerId,
    }
  );
};

export const updateRentalService = async ({
  id,
  rentalName,
  destination,
  subDestination,
  noOfPeopleAccomodate,
  price,
  houseType,
  amenities,
  overview,
  address,
  streetName,
  district,
  state,
  originalImages,
  thumbnailImages,
}) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/rental/${id}`,
    "PATCH",
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    {
      rentalName,
      destination,
      subDestination,
      noOfPeopleAccomodate,
      price,
      houseType,
      amenities,
      overview,
      address,
      streetName,
      district,
      state,
      originalImages,
      thumbnailImages,
    }
  );
};

export const getPropertyBookedDatesService = async (id) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/booking/getBlockDate/${id}`,
    "GET",
    {},
    {}
  );
};

export const uploadImage = async (file) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/upload`,
    "POST",
    {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    { file }
  );
};

export const paymentCheckout = async (price) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/payment/checkout`,
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    { amount: price }
  );
};

export const paymentVerification = async (
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature
) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/payment/paymentVerification`,
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    {
      razorpay_order_id: razorpay_order_id,
      razorpay_payment_id: razorpay_payment_id,
      razorpay_signature: razorpay_signature, //have to not create orde when verification fails -- implment here
    }
  );
};

export const bookARental = async (
  transactionID,
  rentalID,
  userID,
  startDate,
  endDate,
  bookingDate,
  userEmail,
  ownerId,
  bookingCost
) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/booking/bookARental`,
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    {
      transactionID,
      rentalID,
      userID,
      startDate,
      endDate,
      bookingDate,
      userEmail,
      ownerId,
      bookingCost,
    }
  );
};

// export const getModifyPropertyService = async(id) =>{
//   return await Apicall(`${constants.BACKEND_URL}/v1/rental/${id}`,'GET',{},{})
// }
