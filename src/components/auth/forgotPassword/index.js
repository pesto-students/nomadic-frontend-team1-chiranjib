import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

//importing styles
import styles from "./styles.module.css";

//importing Formik
import * as Yup from "yup";
import { Formik } from "formik";

//importing other components
import TextFieldComponent from "../../common/textField";
import Button from "./../../common/button";
import Loader from "../../common/loader";

//importing actions
import { forgotPassword } from "../../../actions/userAction";

//importing toastr
import { toast } from "react-toastify";

const ForgotPassword = ({ userState, forgotPassword }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    let response = await forgotPassword(values);
    fogotPasswordResponseHandler(response)
    setLoading(false);
    // navigate("/dashboard");
  };

  const fogotPasswordResponseHandler = (apiResponse) =>{
    if(apiResponse.responseData && apiResponse.responseData.status === 'success'){
      toast.success("Please check your Email!");
      navigate("/login");
    }
    else{
      let errorMessage = apiResponse.responseData.message ? apiResponse.responseData.message : "Error Occurred!"
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
            initialValues={{
              email: "",
            }}
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
                <Button
                  variant="contained"
                  type="submit"
                  className={styles["forgot-button"]}
                >
                  Reset
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  userState: state.userReducer,
});

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);

export {ForgotPassword as ForgotPasswordTest}