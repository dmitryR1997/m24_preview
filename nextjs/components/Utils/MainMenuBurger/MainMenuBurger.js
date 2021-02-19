import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import { connect } from "react-redux"
import { toggleMainMenu, setHeaderOffsetBottom } from "@actions/layout"

import "./MainMenuBurger.scss"

const MainMenuBurger = ({ toggleMainMenu, isOpenMainMenu, setHeaderOffsetBottom }) => {
  const onClickHandler = () => {
    const header = document.getElementById("header")
    const offset = header.offsetTop + header.offsetHeight - window.pageYOffset
    setHeaderOffsetBottom(offset > 0 ? offset : header.offsetHeight)

    toggleMainMenu()
  }

  return (
    <div
      className={classnames("main-menu-burger", {
        "main-menu-burger--open": isOpenMainMenu
      })}
      onClick={onClickHandler}
    >
      <div className="main-menu-burger__inner"/>
    </div>
  )
}

MainMenuBurger.propTypes = {
  isOpenMainMenu: PropTypes.bool.isRequired,
  toggleMainMenu: PropTypes.func.isRequired,
  setHeaderOffsetBottom: PropTypes.func.isRequired
}

const mapStateToolProps = state => {
  return {
    isOpenMainMenu: state.layout.isOpenMainMenu
  }
}

const mapDispatchToProps = {
  toggleMainMenu,
  setHeaderOffsetBottom
}

export default connect(mapStateToolProps, mapDispatchToProps)(MainMenuBurger)
