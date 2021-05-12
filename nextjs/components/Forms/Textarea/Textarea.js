import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import "./Textarea.scss"

const Textarea = ({ id, label, value, handler, error }) => {
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  const control = (<textarea  className="textarea__control"
                              id={id}
                              onChange={handler}
                              value={value}
  />)


  return (
    <div className={classnames("textarea", {
      "textarea--error": error,
      "textarea--has-text": value
    })}>
      {control}
      <label className="textarea__label" htmlFor={id}>{label}</label>
    </div>
  )
}

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  handler: PropTypes.func,
  error: PropTypes.any
}

export default Textarea
