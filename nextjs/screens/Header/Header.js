import React, { useEffect, useState, useCallback, useRef } from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import { useRouter } from "next/router"
import classnames from "classnames"

import { connect } from "react-redux"
import { setHeaderOffsetBottom } from "@actions/layout"

import Container from "@components/Layout/Container"
import MainMenuBurger from "@components/Utils/MainMenuBurger"
import MiniCart from "@components/Utils/MiniCart"
import HeaderSearch from "@components/Utils/HeaderSearch/HeaderSearch"
import MainMenu from "@components/Utils/MainMenu"

import SiteLogo from "../../public/icons/site-logo.svg"
import ArrowBack from "../../public/icons/arrow-back.svg"

import "./Header.scss"

const Header = ({ isOpenMainMenu, isOpenHeaderSearch, isProduct }) => {
  const header = useRef()
  const router = useRouter()

  const { code } = router.query

  const [headerHeight, setHeaderHeight] = useState(0)
  const [stickyOffsetStart, setStickyOffsetStart] = useState(0)
  const [sticky, setSticky] = useState(false)

  const onScrollHandler = useCallback((event) => {
    if (window.pageYOffset > stickyOffsetStart) {
      setHeaderHeight(header.current.offsetHeight)
      setSticky(true)
    } else {
      setHeaderHeight(0)
      setSticky(false)
    }
  }, [setSticky, setHeaderHeight, stickyOffsetStart])

  useEffect(() => {
    const offset = isProduct ? header.current.offsetTop + 10 : header.current.offsetTop
    setStickyOffsetStart(offset)

    window.addEventListener("scroll", onScrollHandler)

    return () => {
      window.removeEventListener("scroll", onScrollHandler)
    }
  }, [stickyOffsetStart])

  return (
    <>
      <div
        id="header"
        ref={header}
        className={classnames("header", {
          "header--sticky": headerHeight,
          "header--product-page": (isProduct && sticky === false),
          "header--justify-start": isProduct,

          "header--open-header-search": isOpenHeaderSearch,
          "header--open-main-menu": isOpenMainMenu
        })}
      >
        <Container>
          <div className="header__wrapper">
            {isProduct &&
              <div className="header__arrow-back">
                <Link href={`/catalog/${code}`}>
                  <a href={`/catalog/${code}`}>
                    <ArrowBack/>
                  </a>
                </Link>
              </div>
            }

            <Link href="/">
              <a className="header__logo" href="/">
                <SiteLogo/>
              </a>
            </Link>

            <div className="header__nav">
              {!isProduct &&
                <>
                  <div className="header__nav-item header__nav-item--hide-on-open-menu">
                    <HeaderSearch/>
                  </div>
                  <div className="header__nav-item header__nav-item--hide-on-open-menu">
                    <MiniCart/>
                  </div>
                </>
              }

              <div className="header__nav-item">
                <MainMenuBurger/>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {!isProduct &&
        <div id="header-fake" style={{ height: headerHeight }}/>
      }

      <MainMenu/>
    </>
  )
}

Header.propTypes = {
  isOpenMainMenu: PropTypes.bool.isRequired,
  isOpenHeaderSearch: PropTypes.bool.isRequired,
  isProduct: PropTypes.bool
}

const mapStateToolProps = state => {
  return {
    isOpenMainMenu: state.layout.isOpenMainMenu,
    isOpenHeaderSearch: state.layout.isOpenHeaderSearch
  }
}

const mapDispatchToProps = {
  setHeaderOffsetBottom
}

export default connect(mapStateToolProps, mapDispatchToProps)(Header)
