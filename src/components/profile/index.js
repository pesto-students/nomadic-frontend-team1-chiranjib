import React from "react";
//importing styles
import styles from "./styles.module.css";

//importing components
import Footer from "../common/footer";
import Header from "../common/header";
import ProfileFields from "./profileFields";

const ProfileComponent = () => {
  return (
    <>
      <div className={styles["profile-background"]}>
        <div className={styles["profile-header"]}>
          <Header className={styles["profile-header-background"]} />
        </div>

        <div className={styles["center-card"]}>
          <ProfileFields />
        </div>
        <div className={styles["profile-footer"]}>
        <Footer />
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
