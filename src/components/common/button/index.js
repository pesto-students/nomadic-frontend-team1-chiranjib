import React from "react";

//importing MUI
import Button from "@mui/material/Button";

//importing styles
import styles from "./styles.module.css";

const ButtonComponent = (props) => {
  return (
    <>
      <Button
        variant="contained"
        className={`${styles["common-button"]} ${props.className}`}
        onClick={props.onClick}
        disabled={props.disabled}
        color={props.color}
        type={props.type ? props.type : "button"}
      >
        {props.children}
      </Button>
    </>
  );
};

export default ButtonComponent;
