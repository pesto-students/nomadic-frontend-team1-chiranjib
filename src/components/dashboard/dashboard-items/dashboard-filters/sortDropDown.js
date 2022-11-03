import React, { useEffect} from "react";
import { connect } from "react-redux";

//importing MUI
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//importing actions
import { getAllProperties } from "../../../../actions/propertyAction";

import { constants } from "../../../../utils/constants";

const SortDropDown = ({className,propertyState,getAllProperties}) => {
  const [sort, setSort] = React.useState('');

  const handleChange = async (event) => {
    setSort(event.target.value);
    let filtersToSet = {...propertyState}
        
    delete filtersToSet.properties;
    delete filtersToSet.loadMore;
    filtersToSet["sort"] = event.target.value

    await getAllProperties(0, constants.PRODUCT_LIMIT,filtersToSet);
  };

  useEffect(() => {

  
    const sortProps = propertyState["sort"] ? propertyState["sort"] : ""
    setSort(sortProps);

 
}, [propertyState])

  return (
    <Box 
    className={className}
    sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          displayEmpty
          onChange={handleChange}
        >
             <MenuItem value="">
            <em>Sort</em>
          </MenuItem>
          <MenuItem value={"price"}>Price - Low to high</MenuItem>
          <MenuItem value={"-price"}>Price - High to low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}


const mapStateToProps = (state) => ({
    propertyState: state.propertyReducer,
  });
  
  export default connect(mapStateToProps, { getAllProperties })(SortDropDown);
