import React from 'react'

//importing components
import Footer from '../common/footer';
import Header from '../common/header';
import PropertyFields from './propertyFields';

const ModifyPropertyComponent = () => {
  return (
    <>
     <Header  
      />
      <PropertyFields />
      
      <Footer />
    </>
  )
}

export default ModifyPropertyComponent;