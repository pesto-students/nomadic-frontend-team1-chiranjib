import React from "react";
//importing styles
import styles from "./styles.module.css";

//importing components
import Footer from "../common/footer";
import Header from "../common/header";
import PasswordFields from "./passwordFields";

const ChangePasswordComponent = () => {
  return (
    <>
      <div className={styles["password-background"]}>
        <div className={styles["password-header"]}>
          <Header className={styles["password-header-background"]} />
        </div>

        <div className={styles["center-card"]}>
          <PasswordFields />
        </div>
        <div className={styles["password-footer"]}>
        <Footer />
        </div>
      </div>
    </>
  );
};

export default ChangePasswordComponent;
