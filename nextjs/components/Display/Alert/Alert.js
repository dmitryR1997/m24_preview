import PropTypes from "prop-types"
import classnames from "classnames"

import "./Alert.scss"

const Alert = ({ text, mode }) => {
  return (
    <div className={classnames("alert", {
      "alert--warning": mode === "warning"
    })}>
      {text}
    </div>
  )
}

Alert.propTypes = {
  text: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired
}

export default Alert
