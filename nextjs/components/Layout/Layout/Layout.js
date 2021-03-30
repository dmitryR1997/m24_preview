import React, { useEffect } from "react"
import PropTypes from "prop-types"

import { connect } from "react-redux"

import MainMenu from "@components/Utils/MainMenu"
import Modal from "@components/Surfaces/Modal"
import CallMe from "@components/Utils/CallMe/CallMe"

import BeforeHeader from "@screens/BeforeHeader"
import Header from "@screens/Header"
import AboutShop from "@screens/AboutShop"
import Footer from "@screens/Footer"

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
