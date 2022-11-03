import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

//importing styles
import styles from "./styles.module.css";

//importing other components
import { constants } from "../../../../utils/constants";
import ButtonComponent from "../../../common/button";
import DashboardFilter from "./dashboard-filter";
import RangeSlider from "./priceSlider";
import ModalComponent from "../../../common/modal";



//importing actions
import { getAllProperties } from "../../../../actions/propertyAction";

//importing images
import crossIcon from "../../../../public/images/custom-color-cross.svg";
import SortDropDown from "./sortDropDown";
import DashboardSubFilter from "./dashboard-filter/dashboardSubFilter";

const DashboardFilters = ({ propertyState, getAllProperties }) => {
  const [displayFilters, setDisplayFilters] = useState([]);
  const [diplayClearFilter, setdiplayClearFilter] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setDisplayDestinations();
    
  }, []);

  useEffect(()=>{
    if(propertyState.destination && propertyState.destination!==''){

      const destination = constants.DESTINATION_TYPES.find(destination=>destination.name===propertyState.destination)


      const subdestination = constants.SUB_DESTINATION_TYPES.map((filter) => {
        if(filter.destination===propertyState.destination){
          return (
            <DashboardSubFilter
              key={filter.name}
              icon={filter.icon}
              name={filter.name}
            />
          );
        }
        return [];
      })

      
      setDisplayFilters([<DashboardSubFilter
        key={destination.name}
        icon={destination.icon}
        name={destination.name}
      />,
        ...(subdestination)]
      );
    }
    else{
      setDisplayDestinations();
    }

  },[propertyState.destination])

  const setDisplayDestinations = () =>{
    setDisplayFilters(
      constants.DESTINATION_TYPES.map((filter) => {
        return (
          <DashboardFilter
            key={filter.name}
            icon={filter.icon}
            name={filter.name}
          />
        );
      })
    );
  }

  useEffect(() => {
    if (
      propertyState.destination !== "" ||
      propertyState.subDestination !== "" ||
      propertyState.sortBy !== "" ||
      propertyState.sortOrder !== ""
    ) {
      setdiplayClearFilter(true);
    } else {
      setdiplayClearFilter(false);
    }
  }, [propertyState]);

  const clearFilters = async () => {
    await getAllProperties(0, constants.PRODUCT_LIMIT, {});
  };

  return (
    <>
      {openModal && (
        <ModalComponent
        className={styles["modal-container"]}
        >
          <div
            className={styles["close-modal"]}
            onClick={setOpenModal.bind(null, false)}
          >
            <img src={crossIcon}  alt="nomadic"/>
          </div>
          <div className={styles["filter-modal"]}>
            <div
              className={`${styles["margin-modal"]} ${styles["modal-title"]}`}
            >
              Price
            </div>
            <RangeSlider className={`${styles["margin-modal"]}`} />
            <div
              className={`${styles["margin-modal"]}  ${styles["modal-title"]}`}
            >
              Sort By
            </div>
            <SortDropDown 
            className={`${styles["margin-modal"]}`}
            />
            {/* <select
              className={`${styles["margin-modal"]} ${styles["sort-dropdown"]}`}
            >
              <option>1</option>
              <option>2</option>
            </select> */}
            <ButtonComponent
              className={styles["filter-modal-button"]}
              onClick={setOpenModal.bind(null, false)}
            >
              Filter
            </ButtonComponent>
          </div>
        </ModalComponent>
      )}
      <div className={styles["filters"]}>
        <section id="filter-icons" className={styles["filter-icons-section"]}>
          {displayFilters}
        </section>
       
        <section className={styles["filter-button-section"]}>
          {diplayClearFilter && (
            <section className={`${styles["filter-button"]} ${styles["red"]}`}>
              <ButtonComponent color="danger" onClick={clearFilters}>
                Clear
              </ButtonComponent>
            </section>
          )}
          <section className={`${styles["filter-button"]} `}>
            <ButtonComponent onClick={setOpenModal.bind(null, true)}>
              Filter
            </ButtonComponent>
          </section>
        </section>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  propertyState: state.propertyReducer,
});

export default connect(mapStateToProps, { getAllProperties })(DashboardFilters);
