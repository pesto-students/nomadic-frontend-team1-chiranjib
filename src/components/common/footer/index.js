import React from "react";

//importing styles
import styles from "./styles.module.css";

//importing images
import nomadic from "../../../public/images/Nomadic.png";

const Footer = () => {
  return (
    <div className={styles["main-footer"]}>
      <div className={styles["heading"]}>
        <img className={styles["nomadic"]} src={nomadic} alt="nomadic"/> <span>© 2022</span>
      </div>
      <div className={styles["sub-headings"]}>
        <span>Support & resources</span>
        <span>Privacy</span>
        <span>Terms</span>
        <span>Sitemap</span>
        <span>Company details</span>
      </div>
    </div>
  );
};

export default Footer;
