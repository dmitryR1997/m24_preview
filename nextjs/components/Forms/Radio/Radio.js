import React from "react"
import PropTypes from "prop-types"

import "./Radio.scss"

const Radio = ({id, label, image, value, checked, handler}) => {
  return (
    <label className="form-radio">
      {image
        ? <div className="form-radio__label"><img src={image} alt={label}/></div>
        : <div className="form-radio__label">{label}</div>
      }

      <input id={id}
             className="form-radio__input"
             type="radio"
             name={id}
             value={value}
             onChange={handler}
             checked={checked}
      />

      <div className="form-radio__mark"/>
    </label>
  )
}

Radio.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  checked: PropTypes.bool,
  handler: PropTypes.func
}

export default Radio
