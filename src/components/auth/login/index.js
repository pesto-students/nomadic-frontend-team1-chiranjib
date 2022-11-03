import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

//importing styles
import styles from "./styles.module.css";

//importing components
import TextFieldComponent from "../../common/textField";
import Button from "./../../common/button";
import ButtonComponent from "./../../common/button";
import Loader from "../../common/loader";

//importing YUP
import * as Yup from "yup";
import { Formik } from "formik";

//importing Google Auth
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

//importing actions
import { loginUser } from "../../../actions/userAction";

//importing toastr
import { toast } from "react-toastify";

//importing methods 
import { Apicall } from "../../../services/methods";

//importing constants
import { constants } from "../../../utils/constants";



const LogIn = ({ userState, loginUser }) => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "password must be atleast 8 character")
      .required("password is required"),
  });

  const initailValues = {
    email: constants.GUEST_LOGIN,
    password: constants.GUEST_PASSOWRD,
  };

  const handleSubmit = async (values) => {
    
    setLoading(true);
    let loginApiResponse = await loginUser(values);
    setLoading(false);
    loginResponseHandler(loginApiResponse)
  };

  const googleSuccessHandler = async (response) => {
    let backendResponse =await Apicall(`${constants.BACKEND_URL}/v1/auth/googlelogin`,'POST',{},{ tokenId: response.credential })
    loginResponseHandler(backendResponse)
  }

  const googleErrorHandler = (err) => {
    toast.error(err)
  }

  const loginResponseHandler = (loginApiResponse) =>{
    if(loginApiResponse.status === 'success'){
      toast.success("Welcome!");
      localStorage.setItem("user",JSON.stringify(loginApiResponse.data.user));
      localStorage.setItem("authToken",loginApiResponse.token);
      navigate("/dashboard");
    }
    else{
      let errorMessage = loginApiResponse.message ? loginApiResponse.message : "Error Occurred!"
      //Check for making 
      //1st letter capital 
      let formatedErrorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
      toast.error(formatedErrorMessage);
    }
  }



  return (
    <>
      {loading && <Loader />}
     
      <div className={styles["login-background"]}>
        <div className={styles["center-card"]}>
          <Formik
            initialValues={initailValues}
            validationSchema={validate}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {(form) => (
              <form
                onSubmit={form.handleSubmit}
                className={styles["input-container"]}
              >
                <label>
                  <span className={styles["input-title"]}>Email Address</span>
                  <TextFieldComponent
                    id="login-email"
                    name="email"
                    placeholder="Email"
                    width={500}
                    type={"text"}
                    className={styles["input-field"]}
                    
                  />
                </label>
                <label>
                  <span className={styles["input-title"]}>Password</span>
                  <TextFieldComponent
                    id="login-password"
                    name="password"
                    placeholder="Password"
                    width={500}
                    type={"password"}
                    className={styles["input-field"]}
                  />
                </label>
                <Button
                  variant="contained"
                  type="submit"
                  className={styles["login-button"]}
                >
                  Login
                </Button>
              </form>
            )}
          </Formik>
          <div className={styles["google-button"]}>
            <GoogleOAuthProvider clientId="817056518934-0p9ituunl6pnooif02pfgli1kr4n5ldh.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={googleSuccessHandler}
                onError={googleErrorHandler}
              />
            </GoogleOAuthProvider>
          </div>
          <section className={styles["forgot-password"]}>
            {/* <Stack spacing={12} direction="row"> */}
            <ButtonComponent 
            className={styles["transparent-button"]}
            onClick={navigate.bind(null,"/forgotPassword")}
            >
              Forgot your password
            </ButtonComponent>
            <ButtonComponent
              variant="contained"
              className={styles["transparent-button"]}
              onClick={navigate.bind(null,"/signup")}
            >
              Sign Up
            </ButtonComponent>
            {/* </Stack> */}
          </section>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  userState: state.userReducer,
});

export default connect(mapStateToProps, { loginUser })(LogIn);

export {LogIn as Logintest}
