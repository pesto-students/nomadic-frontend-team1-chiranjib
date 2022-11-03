import React from 'react'
import Footer from '../common/footer';
import Header from '../common/header';
import DashboardItems from './dashboard-items'

const DashboardComponent = () => {
  return (
    <>
        <Header 
          displaySearch={true}
        />
        <DashboardItems />
        <Footer />
    </>
  )
}

export default DashboardComponent;