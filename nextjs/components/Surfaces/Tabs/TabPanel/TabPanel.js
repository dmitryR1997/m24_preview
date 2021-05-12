import PropTypes from "prop-types"
import classnames from "classnames"

import "./TabPanel.scss"

const TabPanel = ({ id, selected, children }) => {
  const classes = classnames("tab-panel", { "tab-panel--active": selected })

  return (
    <div className={classes} data-id={id}>
      {children}
    </div>
  )
}

TabPanel.propTypes = {
  id: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired
}

export default TabPanel
