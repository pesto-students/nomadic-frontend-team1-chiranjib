import {
  editProfileService,
  forgotService,
  loginUserService,
  resetPasswordService,
  signupService,
  updatePasswordService,
} from "../services/userService";
import { types } from "./actionTypes";

export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    let loginResponse = await loginUserService(email, password);
    if(loginResponse.status === 'success'){
      dispatch({
        type: types.LOGIN_USER,
        payload: loginResponse,
      });
    }
   
    return loginResponse;
  };

export const signup =
  ({ email, password, confirmPassword, name }) =>
  async (dispatch) => {
    let signupResponse = await signupService(
      email,
      password,
      confirmPassword,
      name
    );
    dispatch({
      type: types.SIGNUP_USER,
      payload: signupResponse,
    });
    return signupResponse;
  };

export const forgotPassword =
  ({ email }) =>
  async (dispatch) => {
    let forgotResponse = await forgotService(email);
    return { error: false, errorData: null, responseData: forgotResponse };
  };

export const resetPassword =
  ({ password, confirmPassword, token }) =>
  async (dispatch) => {
    let resetPasswordResponse = await resetPasswordService(
      password,
      confirmPassword,
      token
    );
    return {
      error: false,
      errorData: null,
      responseData: resetPasswordResponse,
    };
  };

  export const editProfile =
  ({ name, phoneNumber,address,token }) =>
  async (dispatch) => {
    let editProfileResponse = await editProfileService(
      name, phoneNumber,address,token
    );
   
    return editProfileResponse;
  };

  export const updatePassword =
  ({ passwordCurrent,password,confirmPassword }) =>
  async (dispatch) => {
    let updatePasswordResponse = await updatePasswordService(
      passwordCurrent,password,confirmPassword
    );
   
    return updatePasswordResponse;
  };
  
