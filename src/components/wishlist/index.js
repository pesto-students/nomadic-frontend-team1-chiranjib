import React from 'react'

//importing components
import Footer from '../common/footer';
import Header from '../common/header';
import WishlistCards from './wishlist-cards';


const WishlistComponent = () => {
  return (
    <>
     <Header  
      />
      <WishlistCards />
      
      <Footer />
    </>
  )
}

export default WishlistComponent;