import React from 'react'

//importing components
import Footer from '../common/footer';
import Header from '../common/header';
import BookingCards from './booking-cards';


const BookingComponent = () => {
  return (
    <>
     <Header  
      />
      <BookingCards />
      
      <Footer />
    </>
  )
}

export default BookingComponent;