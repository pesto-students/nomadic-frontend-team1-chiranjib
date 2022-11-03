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
import { signup } from "../../../actions/userAction";

//importing toastr
import { toast } from "react-toastify";


const SignUp = ({ userState, signup }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "password must be atleast 8 character")
      .required("password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "confirm password should match with above password"
    ).required("Confirm Password is required"),
  });

  const handleSubmit = async (values) => {

    setLoading(true);
    let response = await signup(values);
    signupResponseHandler(response)
    setLoading(false);
  };

  const signupResponseHandler = (apiResponse) =>{
    if(apiResponse && apiResponse.status === 'success'){
      toast.success("Welcome!");
      navigate("/dashboard");
    }
    else{
      let errorMessage = apiResponse.message ? apiResponse.message : "Error Occurred!"
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
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
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
                  <span className={styles["input-title"]}>Name</span>
                  <TextFieldComponent
                    id="name"
                    name="name"
                    placeholder="Name"
                    width={500}
                    type={"text"}
                    className={styles["input-field"]}
                  />
                </label>
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
                  <span className={`${styles["input-title"]}`}>Password</span>
                  <TextFieldComponent
                    id="login-password"
                    name="password"
                    placeholder="Password"
                    width={500}
                    type={"password"}
                    className={styles["input-field"]}
                  />
                </label>
                <label>
                  <span className={`${styles["input-title"]}`}>
                    Confirm your Password
                  </span>
                  <TextFieldComponent
                    id="login-confirm-password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    width={500}
                    type={"password"}
                    className={styles["input-field"]}
                  />
                </label>

                <Button
                  variant="contained"
                  type="submit"
                  className={styles["signup-button"]}
                >
                  Sign up
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

export default connect(mapStateToProps, { signup })(SignUp);

export {SignUp as Signuptest}