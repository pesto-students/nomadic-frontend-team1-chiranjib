import React from 'react'

//importing components
import Footer from '../common/footer';
import Header from '../common/header';
import MyPropertiesCards from './myPropertiesCards';


const MyPropertiesComponent = () => {
  return (
    <>
     <Header  
      />
      <MyPropertiesCards />
      
      <Footer />
    </>
  )
}

export default MyPropertiesComponent;