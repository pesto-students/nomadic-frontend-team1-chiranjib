import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

//importing MUI
import Grid from "@mui/material/Grid";

//importing styles
import styles from "./styles.module.css";

//importing components
import DashboardFilters from "./dashboard-filters";
import DashboardItem from "./dashboard-item";
import ButtonComponent from "../../common/button";

//importing other components
import Loader from "../../common/loader";


//importing actions
import {
  getAllProperties,
  getMoreProperties,
  getWishlistProductsWithoutDetails
} from "../../../actions/propertyAction";
import { constants } from "../../../utils/constants";

const DashboardItems = ({
  getAllProperties,
  getMoreProperties,
  propertyState,
  getWishlistProductsWithoutDetails
}) => {

  const [loading, setLoading] = useState(false);
  const [displayProperties, setDisplayProperties] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getPropertyHandler();
    getWishlistProductsHandler();
  }, []);

  const getPropertyHandler = async () => {
    setLoading(true);
    await getAllProperties(1, constants.PRODUCT_LIMIT);
    setLoading(false);
  };

  const getWishlistProductsHandler = async () => {
    if (user && user._id && user.name && localStorage.getItem("authToken")) {
    await getWishlistProductsWithoutDetails(user._id);
    }
    
  };
  

  useEffect(() => {
    if (propertyState.properties && propertyState.properties.length > 0) {
      setDisplayProperties(propertyState.properties);
    } else {
      setDisplayProperties([]);
    }
  }, [propertyState.properties]);

  const loadmoreProducts = async () => {
    let skip = propertyState.skip + 1;//propertyState.limit;
    let filter = {
      ...(propertyState.destination && {
        destination: propertyState.destination ? propertyState.destination : "",
      }),
      ...(propertyState.subDestination && {
        subDestination: propertyState.subDestination
          ? propertyState.subDestination
          : "",
      }),
      ...(propertyState.search && {
        search: propertyState.search ? propertyState.search : "",
      }),
      ...(propertyState.sortBy && {
        sortBy: propertyState.sortBy ? propertyState.sortBy : "",
      }),
      ...(propertyState.sortOrder && {
        sortOrder: propertyState.sortOrder ? propertyState.sortOrder : "",
      }),
    };
   
      await getMoreProperties(skip, constants.PRODUCT_LIMIT, filter);
    
    
  };

  return (
    <>
      {loading && <Loader />}
     
      <div className={styles["dashboard"]}>
        <section id="dashboard-filters">
          <DashboardFilters />
        </section>
        <section id="dashboard-items">
          <Grid
            container
            rowSpacing={4}
            columnSpacing={0}
            className={styles["items-container"]}
          >
            {displayProperties.map((property) => (
              <DashboardItem property={property} key={property._id} />
            ))}
            {displayProperties.length===0 && <div className={styles["no-properties-found"]} >No Properties found!</div>}
          </Grid>
        </section>
        <section>
         {propertyState.loadMore && <ButtonComponent
            className={styles["load-more"]}
            onClick={loadmoreProducts}
            disabled={!propertyState.loadMore}
          >
            Load more
          </ButtonComponent>}
        </section>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
});


export default connect(mapStateToProps, {
  getAllProperties,
  getWishlistProductsWithoutDetails,
  getMoreProperties
})(DashboardItems);
