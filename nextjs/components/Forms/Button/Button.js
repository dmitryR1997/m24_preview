import PropTypes from "prop-types"
import classnames from "classnames"

import "./Button.scss"

const Button = ({ classes, label, size, outline, transparent, inCart, isLoading, isBlock, onClick }) => {
  return (
    <button
      className={classnames(`button ${classes ? classes : ''}`, {
        "button--xs": size === "xs",
        "button--outline": outline,
        "button--transparent": transparent,
        "button--in-cart": inCart,
        "button--is-loading": isLoading,
        "button--is-block": isBlock
      })}
      onClick={onClick}
      type="submit"
    >
      {label}
    </button>
  )
}

Button.propTypes = {
  classes: PropTypes.string,
  label: PropTypes.any.isRequired,
  size: PropTypes.string,
  outline: PropTypes.bool,
  transparent: PropTypes.bool,
  inCart: PropTypes.bool,
  isLoading: PropTypes.bool,
  isBlock: PropTypes.bool,
  onClick: PropTypes.func
}

export default Button
