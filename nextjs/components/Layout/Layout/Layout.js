import React from "react"
import PropTypes from "prop-types"

import Modal from "@components/Surfaces/Modal"
import CallMe from "@components/Utils/CallMe/CallMe"

import BeforeHeader from "@screens/BeforeHeader"
import Header from "@screens/Header"
import AboutShop from "@screens/AboutShop"
import Footer from "@screens/Footer"

import "./Layout.scss"

const Layout = ({ children, pageType }) => {
  const isHome = pageType === "home"
  const isCatalog = pageType === "category"
  const isProduct = pageType === "product"
  const isCart = pageType === "cart"

  return (
    <div className="default-layout">
      {pageType &&
        <input className="gtm-page-type" type="hidden" value={pageType} />
      }

      <div className="default-layout__top">
        {!isProduct &&
          <BeforeHeader />
        }

        <Header isProduct={isProduct} />
      </div>

      <div className="default-layout__content">
        {children}
      </div>

      <div className="default-layout__bottom">
        {!isCart &&
        <AboutShop showText={!isProduct}/>
        }

        <Footer />
      </div>

      <Modal/>
      <CallMe/>
    </div>
  )
}

Layout.propTypes = {
  pageType: PropTypes.string
}

export default Layout
