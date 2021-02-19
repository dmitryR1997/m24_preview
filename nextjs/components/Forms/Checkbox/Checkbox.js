import React from "react"
import PropTypes from "prop-types"

import CheckboxIcon from "../../../public/icons/checkbox.svg"

import "./Checkbox.scss"

const Checkbox = ({ id, label, image, onClick }) => {
  return (
    <label className="form-check" htmlFor={id}>
      {image
        ? <div className="form-check__label"><img src={image} alt={label} /></div>
        : <div className="form-check__label">{label}</div>
      }

      <input type="checkbox" className="form-check__input" id={id} />

      <div className="form-check__mark-checked">
        <CheckboxIcon/>
      </div>

      <div className="form-check__mark"/>
    </label>
  )
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

export default Checkbox
