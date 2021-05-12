import PropTypes from "prop-types"
import classnames from "classnames"

import "./Container.scss"

const Container = ({ children, classes, disablePadding, isRelative }) => {
  return (
    <div className={classnames("container", ...classes, {
      "container--no-padding": disablePadding,
      "container--is-relative": isRelative
    })}>
      {children}
    </div>
  )
}

Container.defaultProps = {
  classes: []
}

Container.propTypes = {
  disablePadding: PropTypes.bool,
  isRelative: PropTypes.bool,
  classes: PropTypes.array
}

export default Container
