import React from "react"
import PropTypes from "prop-types"

import Modal from "@components/Surfaces/Modal"
import CallMe from "@components/Utils/CallMe/CallMe"

import BeforeHeader from "@screens/BeforeHeader"
import Header from "@screens/Header"
import AboutShop from "@screens/AboutShop"
import Footer from "@screens/Footer"

import "./Layout.scss"

const Layout = ({ children, productPage }) => {
  return (
    <div className="default-layout">
      <div className="default-layout__top">
        {!productPage &&
          <BeforeHeader />
        }

        <Header isProduct={productPage} />
      </div>

      <div className="default-layout__content">
        {children}
      </div>

      <div className="default-layout__bottom">
        <AboutShop showText={!productPage} />

        <Footer />
      </div>

      <Modal/>
      <CallMe/>
    </div>
  )
}

Layout.propTypes = {
  productPage: PropTypes.bool
}

export default Layout
