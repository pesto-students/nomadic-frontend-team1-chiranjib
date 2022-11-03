import React from "react";

//importing MUI
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

//importing styles
import styles from "./styles.module.css";

const Loader = () => {
  return (
    <div className={styles["loader-background"]}>
      <Box 
      sx={{ display: "flex" }}
      className={styles["loader-icon"]}
      >
        <CircularProgress />
      </Box>
    </div>
  );
};

export default Loader;
