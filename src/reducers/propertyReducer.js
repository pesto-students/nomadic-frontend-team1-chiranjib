import { types } from "../actions/actionTypes";
import { constants } from "../utils/constants";

export default (
  state = {
    properties: [],
    destination: "",
    subDestination: "",

    skip: 1,
    limit: constants.PRODUCT_LIMIT,
    loadMore: true,
    search: "",
    "price[gte]": "",
    "price[lte]": "",
    sort: "",
    wishlist:[]
  },
  action
) => {
  switch (action.type) {
    case types.GET_ALL_PROPERTIES:
      return {
        ...state,
        properties: action.payload.tours ? action.payload.tours : [],
        destination: action.destination ? action.destination : "",
        subDestination: action.subDestination ? action.subDestination : "",
        search: action.search ? action.search : "",
        sort: action.sort ? action.sort : "",
        skip: action.skip ? action.skip : 1,
        limit: action.limit ? action.limit : constants.PRODUCT_LIMIT,
        loadMore: action.loadMore,
        "price[gte]": action["price[gte]"] ? action["price[gte]"] : "",
        "price[lte]": action["price[lte]"] ? action["price[lte]"] : "",
      };
    case types.GET_SEARCH_PROPERTIES:
      return {
        ...state,
        properties: action.payload.rentals ? action.payload.rentals : [],
        destination: action.destination ? action.destination : "",
        subDestination: action.subDestination ? action.subDestination : "",
        search: action.search ? action.search : "",
        sort: action.sort ? action.sort : "",
        skip: action.skip ? action.skip : 1,
        limit: action.limit ? action.limit : constants.PRODUCT_LIMIT,
        loadMore: action.loadMore,
        "price[gte]": action["price[gte]"] ? action["price[gte]"] : "",
        "price[lte]": action["price[lte]"] ? action["price[lte]"] : "",
      };
    case types.GET_MORE_PROPERTIES:
      return {
        ...state,
        properties: [
          ...state.properties,
          ...(action.payload.tours && action.payload.tours.length > 0
            ? action.payload.tours
            : []),
        ],
        skip: action.skip ? action.skip : 1,
        limit: action.limit ? action.limit : constants.PRODUCT_LIMIT,
        loadMore: action.loadMore,
      };
      case types.GET_WISHLIST:
        return {
          ...state,
          wishlist:action.payload ? action.payload : [],
        };
        case types.ADD_WISHLIST:
        return {
          ...state,
          wishlist:[...state.wishlist, (action.payload ? action.payload : {})],
        };
    default:
      return state;
  }
};
