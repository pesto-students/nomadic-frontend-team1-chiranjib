import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";

//importing styles
import styles from "./styles.module.css";

//importing images
import search from "../../../../public/images/search-icon.png";
import ButtonComponent from '../../button';

//importing other components
import { getAllProperties } from '../../../../actions/propertyAction';
import { constants } from '../../../../utils/constants';


const Search = ({getAllProperties,propertyState}) => {

    const [searchInput, setSearchInput] = useState("");

    const setFilters = async (e) =>{
        e.preventDefault();

        let filtersToSet = {...propertyState}
        
        delete filtersToSet.properties;
        delete filtersToSet.loadMore;
        filtersToSet.search = searchInput

        await getAllProperties(0, constants.PRODUCT_LIMIT,filtersToSet);
      }

      useEffect(() => {

        setSearchInput(propertyState.search)
  
    }, [propertyState.search])
    
  return (
    <form 
    className={styles['container']}
    onSubmit={setFilters}
    >
        <input 
        onChange={(e=>setSearchInput(e.target.value))}
        value={searchInput}
        />
        <ButtonComponent 
        type="submit"
        className={styles['round']}
        onClick={setFilters}
        >
        <img 
        src={search} 
        className={styles['search-icon']}
        alt="nomadic"
        />
        </ButtonComponent>
        
    </form>
  )
}

// export default ;

const mapStateToProps = (state) => ({
    propertyState: state.propertyReducer,
  });
  
  export default connect(mapStateToProps, {getAllProperties})(Search);