import React, {  useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

//importing styles
import styles from "./styles.module.css";

//importing Formik
import * as Yup from "yup";
import { Formik } from "formik";

//importing other components
import TextFieldComponent from "../../common/textField";
import Button from "../../common/button";

//importing actions
import { resetPassword } from "../../../actions/userAction";
import Loader from "../../common/loader";

//importing toastr
import { toast } from "react-toastify";

const ResetPassword = ({ userState, resetPassword }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const validate = Yup.object({
    password: Yup.string()
      .min(8, "password must be atleast 8 character")
      .required("password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "confirm password should match with above password"
    ),
  });

  const handleSubmit = async (values) => {
  
    setLoading(true);
    let response = await resetPassword({...values,token});
    resetPasswordResponseHandler(response)

    setLoading(false);
  };

  const resetPasswordResponseHandler = (apiResponse) =>{
    if(apiResponse.responseData && apiResponse.responseData.status === 'success'){
      toast.success("Password changed Successfully!");
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
                <label>
                  <span className={styles["input-title"]}>
                    Confirm Password
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
                  className={styles["reset-button"]}
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

export default connect(mapStateToProps, { resetPassword })(ResetPassword);
