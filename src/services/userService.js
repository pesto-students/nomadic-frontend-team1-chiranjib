import { constants } from "../utils/constants";
import { Apicall } from "./methods";



export const loginUserService = async (email, password) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/auth/login`,
    "POST",
    {},
    { email, password }
  );
};

export const signupService = async (email, password, confirmPassword, name) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/auth/signup`,
    "POST",
    {},
    { email, password, confirmPassword, name }
  );
};

export const forgotService = async (email) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/auth/forgotpassword`,
    "POST",
    {},
    { email }
  );
};

export const resetPasswordService = async (
  password,
  confirmPassword,
  token
) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/auth/resetPassword/${token}`,
    "PATCH",
    {},
    { password, confirmPassword }
  );
};

export const editProfileService = async (name, mobileNumber, address, tokenDetails) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/auth/updateUser`,
    "PATCH",
    { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    { name, mobileNumber, address }
  );
};

export const updatePasswordService = async (passwordCurrent,password,confirmPassword) => {
  return await Apicall(
    `${constants.BACKEND_URL}/v1/auth/updatePassword`,
    "PATCH",
    { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("authToken")}` },
    { passwordCurrent,password,confirmPassword }
  );
};

