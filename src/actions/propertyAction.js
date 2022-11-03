import { addToWishlistService, cancelBookingsService, getAllPropertiesService, getBookingsService, getBookingsServiceAdmin, getPropertiesService, getPropertyBookedDatesService, getPropertyByIdService, getWishlistProductsWithoutDetailsService, getWishlistService, removeWishlistService } from "../services/propertyServices";
import { constants } from "../utils/constants";
import { types } from "./actionTypes";

export const getAllProperties =
  (skip, limit, filters = {}) =>
  async (dispatch) => {
    let properties = await getAllPropertiesService(skip, limit, filters);
    if(properties.status === "success"){
      dispatch({
        type: types.GET_ALL_PROPERTIES,
        payload: properties.data,
        skip,
        limit,
        loadMore: properties.results >= constants.PRODUCT_LIMIT ? true : false,
        ...filters,
      });
      return properties;
    }
    
  };

  export const getWishlistProductsWithoutDetails =
  (userId) =>
  async (dispatch) => {
    let wishlist = await getWishlistProductsWithoutDetailsService(userId);
    if(wishlist.status === "success"){
      dispatch({
        type: types.GET_WISHLIST,
        payload: wishlist.data.allWishlist,
      });
      return wishlist;
    }
    
  };

  export const addToWishlist =
  (userId, rentalId) =>
  async (dispatch) => {
    let wishlist = await addToWishlistService(userId, rentalId);
    if(wishlist.status === "success"){
      dispatch({
        type: types.ADD_WISHLIST,
        payload: wishlist.data.wishlist,
      });
      return wishlist;
    }
    
  };

  export const getSearchProperties =
  (skip, limit, filters = {}) =>
  async (dispatch) => {
    let properties = await getAllPropertiesService(skip, limit, filters);
    if(properties.status === "success"){
      dispatch({
        type: types.GET_SEARCH_PROPERTIES,
        payload: properties.data,
        skip,
        limit,
        loadMore: properties.data.rentals >= constants.PRODUCT_LIMIT ? true : false,
        ...filters,
      });
      return properties;
    }
    
  };

export const getMoreProperties =
  (skip, limit, filters = {}) =>
  async (dispatch) => {
    let properties = await getAllPropertiesService(skip, limit, filters);
    dispatch({
      type: types.GET_MORE_PROPERTIES,
      payload: properties.data,
      skip,
      limit,
      loadMore: properties.results >= constants.PRODUCT_LIMIT ? true : false,
    });
    return properties;
  };

  export const getPropertyById =
  (id) =>
  async (dispatch) => {
    let propertyDetails = await getPropertyByIdService(id);
    return propertyDetails;
  };

  export const getPropertyBookedDates =
  (id) =>
  async (dispatch) => {
    let propertyDetails = await getPropertyBookedDatesService(id);
    return propertyDetails;
  };


  export const getBookings =
  (id) =>
  async (dispatch) => {
    let getBookings = await getBookingsService(id);
    return getBookings;
  };

  export const getBookingsAdmin =
  (id) =>
  async (dispatch) => {
    let getBookings = await getBookingsServiceAdmin(id);
    return getBookings;
  };

  export const getProperties =
  (id) =>
  async (dispatch) => {
    let getBookings = await getPropertiesService(id);
    return getBookings;
  };


  export const getWishlist =
  (id) =>
  async (dispatch) => {
    let wishlist = await getWishlistService(id);
    return wishlist;
  };

  export const removeWishlist =
  (id) =>
  async (dispatch) => {
    let wishlist = await removeWishlistService(id);
    return wishlist;
  };

  export const cancelBookings =
  (id) =>
  async (dispatch) => {
    let cancelBookings = await cancelBookingsService(id);
    return cancelBookings;
  };

  export const getModifyProperty =
  (id) =>
  async (dispatch) => {
    let getProperty = await getPropertyByIdService(id);
    return getProperty;
  };


