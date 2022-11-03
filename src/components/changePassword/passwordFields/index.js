import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

//importing styles
import styles from "./styles.module.css";

//importing Formik
import * as Yup from "yup";
import { Formik } from "formik";

//importing MUI
import Grid from "@mui/material/Grid";

//importing other components
import Loader from "../../common/loader";
import TextFieldComponent from "../../common/textField";
import Button from "../../common/button";
import { updatePassword } from "../../../actions/userAction";

//importing toastr
import { toast } from "react-toastify";

const PasswordFields = ({ userState, updatePassword }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (
      user != null &&
      user._id &&
      user.name &&
      localStorage.getItem("authToken")
    ) {
    } else {
      toast.error("Please Login!");
      navigate("/dashboard");
    }
  }, []);

  const initialValues = {
    passwordCurrent: "",
    password: "",
    confirmPassword: "",
  };
  const [loading, setLoading] = useState(false);

  const validate = Yup.object({
    passwordCurrent: Yup.string()
      .min(8, "password must be atleast 8 character")
      .required("Current password is required"),
    password: Yup.string()
      .min(8, "password must be atleast 8 character")
      .required("New password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "confirm password should match with above password"
    ).required("Confirm password is required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const updatePasswordResponse = await updatePassword({
      ...values,
      token: localStorage.getItem("authToken"),
    });
    if (updatePasswordResponse.status === "success") {
    
      toast.success("Password Updated!");
      navigate("/dashboard");
    } else {
      let errorMessage = updatePasswordResponse.message
        ? updatePasswordResponse.message
        : "Error Occurred!";
      toast.error(errorMessage);
    }

    setLoading(false);
  };

  return (
    <>
      {loading && <Loader />}

      <div className={styles["password-container"]}>
        <div className={styles["password-title"]}>Update Password</div>

        <Formik
          initialValues={initialValues}
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
              <label
                className={`${styles["input-row"]} ${styles["flex-center"]}`}
              >
                <Grid container className={styles["item-container"]}>
                  <Grid
                    item
                    md={3}
                    xs={12}
                    padding={0}
                    className={`${styles["flex-center"]}`}
                  >
                    <span className={styles["input-title"]}>Current Password</span>
                  </Grid>
                  <Grid item md={9} xs={12} padding={0}>
                    <TextFieldComponent
                      id="passwordCurrent"
                      name="passwordCurrent"
                      placeholder="******"
                      width={500}
                      type={"password"}
                      className={styles["input-field"]}
                    />
                  </Grid>
                </Grid>
              </label>

              <label
                className={`${styles["input-row"]} ${styles["flex-center"]}`}
              >
                <Grid container className={styles["item-container"]}>
                  <Grid
                    item
                    md={3}
                    xs={12}
                    padding={0}
                    className={`${styles["flex-center"]}`}
                  >
                    <span className={styles["input-title"]}>New Password</span>
                  </Grid>
                  <Grid item md={9} xs={12} padding={0}>
                    <TextFieldComponent
                      id="password"
                      name="password"
                      placeholder="******"
                      width={500}
                      type={"password"}
                      className={styles["input-field"]}
                    />
                  </Grid>
                </Grid>
              </label>
              <label
                className={`${styles["input-row"]} ${styles["flex-center"]}`}
              >
                <Grid container className={styles["item-container"]}>
                  <Grid
                    item
                    md={3}
                    xs={12}
                    padding={0}
                    className={`${styles["flex-center"]}`}
                  >
                    <span className={styles["input-title"]}>Confirm Password</span>
                  </Grid>
                  <Grid item md={9} xs={12} padding={0}>
                    <TextFieldComponent
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="******"
                      width={500}
                      type={"password"}
                      className={styles["input-field"]}
                      
                    />
                  </Grid>
                </Grid>
              </label>
            
              <Button
                variant="contained"
                type="submit"
                className={styles["submit-button"]}
              >
                Update
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  userState: state.userReducer,
});

export default connect(mapStateToProps, { updatePassword })(PasswordFields);
