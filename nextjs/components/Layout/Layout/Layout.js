import React, { useEffect } from "react"
import PropTypes from "prop-types"
import dynamic from "next/dynamic"

import { connect } from "react-redux"

const MainMenu = dynamic(() => import("@components/Utils/MainMenu"))
const Modal = dynamic(() => import("@components/Surfaces/Modal"))
const CallMe = dynamic(() => import("@components/Utils/CallMe/CallMe"))
const HeaderSearch = dynamic(() => import("@components/Utils/HeaderSearch/HeaderSearch"))

const BeforeHeader = dynamic(() => import("@screens/BeforeHeader"))
const Header = dynamic(() => import("@screens/Header"))
const AboutShop = dynamic(() => import("@screens/AboutShop"))
const Footer = dynamic(() => import("@screens/Footer"))

import "./Layout.scss"

const Layout = ({ children, pageType, categories, seoText, isOpenMainMenu }) => {
  const isHome = pageType === "home"
  const isCatalog = pageType === "category"
  const isProduct = pageType === "product"
  const isCart = pageType === "cart"

  useEffect(() => {
    const body = document.querySelector('body')

    if(isOpenMainMenu) {
      document.querySelector("body").classList.add("overflow-hidden")
    } else {
      document.querySelector("body").classList.remove("overflow-hidden")
    }

    return () => {
      document.querySelector("body").classList.remove("overflow-hidden")
    }
  }, [isOpenMainMenu])

  return (
    <>
      <div className="default-layout">
        {pageType &&
        <input className="gtm-page-type" type="hidden" value={pageType} />
        }

        <div className="default-layout__top">
          {!isProduct &&
          <BeforeHeader />
          }

          <Header categories={categories} isProduct={isProduct} />
        </div>

        <div className="default-layout__content">
          {children}
        </div>

        <div className="default-layout__bottom">
          {!isCart &&
          <AboutShop showText={!isProduct} text={seoText}/>
          }

          <Footer />
        </div>

        <Modal/>
        <CallMe/>
      </div>

      <MainMenu categories={categories} />
      <HeaderSearch/>
    </>
  )
}

Layout.propTypes = {
  isOpenMainMenu: PropTypes.bool.isRequired,
  pageType: PropTypes.string,
  seoText: PropTypes.string
}

const mapStateToolProps = state => {
  return {
    isOpenMainMenu: state.layout.isOpenMainMenu
  }
}

export default connect(mapStateToolProps)(Layout)
