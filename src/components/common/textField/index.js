import React from "react";

// imporitng text field  from materalUi
import TextField from "@mui/material/TextField";
import { ErrorMessage, useField } from "formik";

//importing styles
import styles from "./styles.module.css";

const TextFieldComponent = (props) => {

  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        id={props.id}
        type={props.type}
        className={`${styles["common-textfield"]} ${
          meta.touched && meta.error
        } ${props.className}`}
        {...field}
        name={props.name}
        placeholder={props.placeholder}
        margin={props.margin}
        fullWidth
        disabled={props.disabled ? props.disabled : false}
        InputProps={props.inputProps}
      />
      <ErrorMessage component="div" name={field.name}  className={`${styles["error"]}`}/>
    </>
  );
};

export default TextFieldComponent;
