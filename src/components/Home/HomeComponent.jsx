import React from 'react'
import Products from './Products/Products'
import Banner from './Banner/Banner'
import Filter from './Filter/Filter'
import { Helmet } from 'react-helmet'

function HomeComponent() {
  return (
    <>
      <Helmet>
        <title>{`Kalyke - 3D Printing Designs Marketplace`}</title>
        <meta name="description" content={"Crafting tomorrow's possibilities with 3D-Printed Designs. Visit us to transform your ideas into reality."} />
        <meta property="og:title" content={`Kalyke - 3D Printing Designs Marketplace`} />
        <meta property="og:description" content={"Crafting tomorrow's possibilities with 3D-Printed Designs. Visit us to transform your ideas into reality."} />
      </Helmet>
      <Banner />
      <Filter />
      <Products />
    </>
  )
}

export default HomeComponent
