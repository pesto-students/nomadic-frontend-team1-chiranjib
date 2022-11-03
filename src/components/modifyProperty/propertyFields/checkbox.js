import React from "react";


//importing MUI
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const CheckboxComponent = (props) => {
  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={props.form.values[props.name].includes(props.label)}
            />
          }
          label={props.label}
          onClick={props.onClick}
          style={{textAlign:"left"}}
        />
      </FormGroup>
    </>
  );
};

export default CheckboxComponent;
