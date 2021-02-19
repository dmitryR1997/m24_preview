import React from "react"
import PropTypes from "prop-types"

import "./Button.scss"

const Button = ({ label, size, outline, onClick }) => {
  return (
    <button
      className={`button ${size === "xs" ? "button--xs" : ""} ${outline ? "button--outline" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.string,
  outline: PropTypes.bool,
  onClick: PropTypes.func
}

export default Button
