import { types } from "../actions/actionTypes";
import { constants } from "../utils/constants";

export default (
  state = {
    user: {},
    
  },
  action
) => {
  switch (action.type) {
    case types.LOGIN_USER:
      return {
        ...state,
        user:action.payload ? action.payload : [],
      };
      case types.SIGNUP_USER:
      return {
        ...state,
        user:action.payload ? action.payload : [],
      };
      
    default:
      return state;
  }
};
