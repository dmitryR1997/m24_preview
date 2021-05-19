import { useEffect } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import { connect } from "react-redux"

import BeforeHeader from "@screens/BeforeHeader"
import Header from "@screens/Header/Header"
import MainMenu from "@components/Utils/MainMenu/MainMenu"
import Modal from "@components/Surfaces/Modal/Modal"
import CallMe from "@components/Utils/CallMe"
import HeaderSearch from "@components/Utils/HeaderSearch/HeaderSearch"

import AboutShop from "@screens/AboutShop"
import Footer from "@screens/Footer"

import "./Layout.scss"


const Layout = ({ children, pageType, categories, seoText, isOpenMainMenu, isOverflowInitial, hideAboutShop }) => {
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
      <div className={classnames("default-layout", {
        "default-layout--is-overflow-initial": isOverflowInitial
      })}>
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
          {!hideAboutShop &&
          <AboutShop showText={!isProduct} text={seoText}/>
          }

          <Footer />
        </div>
      </div>

      <Modal/>
      <CallMe/>
      <MainMenu categories={categories} />
      <HeaderSearch/>
    </>
  )
}

Layout.propTypes = {
  isOpenMainMenu: PropTypes.bool.isRequired,
  isOverflowInitial: PropTypes.bool,
  hideAboutShop: PropTypes.bool,
  pageType: PropTypes.string,
  seoText: PropTypes.string,
  userAgent: PropTypes.string
}

const mapStateToolProps = state => {
  return {
    isOpenMainMenu: state.layout.isOpenMainMenu
  }
}

export default connect(mapStateToolProps)(Layout)
