import React from "react"
import PropTypes from "prop-types"

import CheckboxIcon from "../../../public/icons/checkbox.svg"

import "./Checkbox.scss"

const Checkbox = ({ id, name, label, value, image, onClick }) => {
  return (
    <label className="form-check" htmlFor={id}>
      {image
        ? <div className="form-check__label"><img src={image} alt={label} /></div>
        : <div className="form-check__label">{label}</div>
      }

      <input type="checkbox"
             className="form-check__input"
             name={name}
             id={id}
             value={id}
             onChange={onClick}
      />

      <div className="form-check__mark-checked">
        <CheckboxIcon/>
      </div>

      <div className="form-check__mark"/>
    </label>
  )
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  image: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

export default Checkbox
