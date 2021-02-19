import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import "./TabButton.scss"

const TabButton = ({ id, selected, onClick, children }) => {
  const classes = classnames("tab-button", { "tab-button--active": selected })

  return (
    <div className={classes} onClick={onClick} data-id={id}>
      {children}
    </div>
  )
}

TabButton.propTypes = {
  id: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired
}

export default TabButton
