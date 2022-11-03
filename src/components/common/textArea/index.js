import React from "react";

// imporitng text field  from materalUi

import { ErrorMessage, useField } from "formik";

//importing styles
import styles from "./styles.module.css";
import {  TextareaAutosize } from "@mui/material";

const TextAreaComponent = (props) => {

  const [field, meta] = useField(props);
  return (
    <>
      <TextareaAutosize
        id={props.id}
       
        className={`${styles["common-textfield"]} ${
          meta.touched && meta.error
        } ${props.className}`}
        {...field}
        name={props.name}
        placeholder={props.placeholder}
        margin={props.margin}
        
        disabled={props.disabled ? props.disabled : false}
        
        minRows={props.lines}
      />
      <ErrorMessage component="div" name={field.name}  className={`${styles["error"]}`}/>
    </>
  );
};

export default TextAreaComponent;
