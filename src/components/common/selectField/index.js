import React from "react";

// imporitng text field  from materalUi
import { ErrorMessage, useField } from "formik";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

//importing styles
import styles from "./styles.module.css";

const SelectFieldComponent = (props) => {

  const [field, meta] = useField(props);


  const options = props.options ? props.options.map((option)=><MenuItem key={option} value={option}>{option}</MenuItem>) : [];

  return (
    <>


      <Select
        labelId={props.id}
        id={props.id}
        value={props.value}
        name={props.name}
        displayEmpty
        onChange={props.onChange || ((event) => {
          props.form.setFieldValue(props.name, event.target.value);
        })}
        className={`${
          meta.touched && meta.error
        } ${props.className}`}
        onClick={props.onClick}
      >
        <MenuItem value="">
          <em className={`${styles["non-italic-select-option"]}`}>
            {props.placeholder}
          </em>
        </MenuItem>
        {options}
      </Select>


     
      <ErrorMessage
        component="div"
        name={field.name}
        className={`${styles["error"]}`}
      />
    </>
  );
};

export default SelectFieldComponent;
