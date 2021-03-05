import React from "react"
import PropTypes from "prop-types"
import InputMask from "react-input-mask"

import "./Input.scss"

const Input = ({ id, label, value, handler, mask }) => {
  const control = (<input type="text"
                         className="input__control"
                         id={id}
                         onChange={handler}
                         required={true}
                         value={value}
  />)

  if (mask) {
    return (
      <div className="input">
        <InputMask  mask={mask}
                    value={value}
                    onChange={handler}
        >
          {control}
        </InputMask>
        <label className="input__label" htmlFor={id}>{label}</label>
      </div>
    )
  }

  return (
    <div className="input">
      {control}
      <label className="input__label" htmlFor={id}>{label}</label>
    </div>
  )
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  handler: PropTypes.func,
  mask: PropTypes.string
}

export default Input
