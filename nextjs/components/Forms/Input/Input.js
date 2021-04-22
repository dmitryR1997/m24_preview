import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import InputMask from "react-input-mask"

import "./Input.scss"

const Input = ({ id, label, value, handler, mask, error }) => {
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  const control = (<input type="text"
                          className="input__control"
                          id={id}
                          onChange={handler}
                          value={value}
  />)

  if (mask) {
    return (
      <div className={classnames("input", {
        "input--error": error,
        "input--has-text": value
      })}>
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
    <div className={classnames("input", {
      "input--error": error,
      "input--has-text": value
    })}>
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
  mask: PropTypes.string,
  error: PropTypes.any
}

export default Input
