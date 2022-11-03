import React from "react";
import { connect } from "react-redux";

//importing styles
import styles from "./styles.module.css";

//importing actions
import { getAllProperties } from "../../../../../actions/propertyAction";

import { constants } from "../../../../../utils/constants";




const DashboardFilter = ({getAllProperties,name,icon,propertyState}) => {

  const setFilters = async (destination) =>{
    let filtersToSet = {...propertyState}
        
    delete filtersToSet.properties;
    delete filtersToSet.loadMore;
    filtersToSet.destination = destination;

    await getAllProperties(0, constants.PRODUCT_LIMIT,filtersToSet);
  }

  return (
    <>
     {name && <div 
      className={styles["filter-icon"]}
      onClick={setFilters.bind(null,name)}
      >
      <i className={`fa ${styles["fa-height"]} ${propertyState.destination===name && styles["highlight"]} ${icon}`}></i>  
        <span
        className={`${styles["filter-name"]} ${propertyState.destination===name && styles["highlight"]}`}
        >{name}</span>
      </div>}
    </>
  );
};

const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
});


export default connect(mapStateToProps, {getAllProperties})(DashboardFilter);
