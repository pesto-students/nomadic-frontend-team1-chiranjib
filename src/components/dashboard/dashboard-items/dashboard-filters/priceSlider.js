import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";

//importing MUI
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

//importing lodash
import debounce from "lodash/debounce";

import { getAllProperties } from "../../../../actions/propertyAction";
import { constants } from "../../../../utils/constants";

function valuetext(value) {
  return `${value}°C`;
}

const RangeSlider = ({ getAllProperties, className,propertyState }) => {
  const [value, setValue] = useState([0, constants.SLIDER_MAX_VALUE]);

  const callHttpRequest = async (val) => {
    let filtersToSet = {...propertyState}
        
    delete filtersToSet.properties;
    delete filtersToSet.loadMore;
    filtersToSet["price[gte]"] = val[0]
    filtersToSet["price[lte]"] = val[1]

    await getAllProperties(0, constants.PRODUCT_LIMIT,filtersToSet);
  };

  const stateDebounceCallHttpRequest = useCallback(
    debounce(callHttpRequest, 500),
    []
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
    stateDebounceCallHttpRequest(newValue);
  };

  useEffect(() => {

      const startPrice = propertyState["price[gte]"] ? propertyState["price[gte]"] : 0
      const endPrice = propertyState["price[lte]"] ? propertyState["price[lte]"] : constants.SLIDER_MAX_VALUE
      setValue([startPrice , endPrice]);

   
  }, [propertyState])
  

  return (
    <Box className={className}>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
        min={0}
        max={20000}
      />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
});

export default connect(mapStateToProps, { getAllProperties })(RangeSlider);
