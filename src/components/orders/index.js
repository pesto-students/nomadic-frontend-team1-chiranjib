import React from 'react'

//importing components
import Footer from '../common/footer';
import Header from '../common/header';
import OrderCards from './order-cards';


const OrderComponent = () => {
  return (
    <>
     <Header  
      />
      <OrderCards />
      
      <Footer />
    </>
  )
}

export default OrderComponent;