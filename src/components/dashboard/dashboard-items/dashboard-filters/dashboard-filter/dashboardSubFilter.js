import React from "react";
import { connect } from "react-redux";

//importing styles
import styles from "./styles.module.css";

//importing actions
import { getAllProperties } from "../../../../../actions/propertyAction";

import { constants } from "../../../../../utils/constants";

const DashboardSubFilter = ({
  getAllProperties,
  name,
  icon,
  propertyState,
}) => {
  const setFilters = async (destination) => {
    if(propertyState.subDestination !== destination){
      let filtersToSet = { ...propertyState };

      delete filtersToSet.properties;
      delete filtersToSet.loadMore;
      filtersToSet.subDestination = destination;
  
      await getAllProperties(0, constants.PRODUCT_LIMIT, filtersToSet);
    }
  };

  return (
    <>
      {/* DESTINATION NAME */}
      {name && propertyState.destination === name && (
        <div className={styles["filter-icon"]}>
          <i
            className={`fa ${styles["fa-height"]} ${
              (propertyState.subDestination === name ||
                propertyState.destination === name) &&
              styles["highlight"]
            } ${icon} ${styles["destination-selected"]}`}
          ></i>
          <span
            className={`${styles["filter-name"]} ${
              (propertyState.subDestination === name ||
                propertyState.destination === name) &&
              styles["highlight"]
            } ${styles["destination-selected"]}`}
          >
            {name}
          </span>
        </div>
      )}
      {/* SUB-DESTINATIONS NAME */}
      {name && propertyState.destination !== name && (
        <div
          className={styles["filter-icon"]}
          onClick={setFilters.bind(null, name)}
        >
          <i
            className={`fa ${styles["fa-height"]} ${
              styles["fa-height-subdestination"]
            } ${
              (propertyState.subDestination === name ||
                propertyState.destination === name) &&
              styles["highlight"]
            } ${icon}`}
          ></i>
          <span
            className={`${styles["filter-name"]} ${
              (propertyState.subDestination === name ||
                propertyState.destination === name) &&
              styles["highlight"]
            }`}
          >
            {name}
          </span>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
});

export default connect(mapStateToProps, { getAllProperties })(
  DashboardSubFilter
);
