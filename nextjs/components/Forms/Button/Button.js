import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import "./Button.scss"

const Button = ({ label, size, outline, inCart, isLoading, onClick }) => {
  return (
    <button
      className={classnames("button", {
        "button--xs": size === "xs",
        "button--outline": outline,
        "button--in-cart": inCart,
        "button--is-loading": isLoading
      })}
      onClick={onClick}
      type="submit"
    >
      {label}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.string,
  outline: PropTypes.bool,
  inCart: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func
}

export default Button
