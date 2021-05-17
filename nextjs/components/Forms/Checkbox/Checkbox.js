import PropTypes from "prop-types"
import classnames from "classnames"

import CheckboxIcon from "../../../public/icons/checkbox.svg"

import "./Checkbox.scss"

const Checkbox = ({ id, name, label, image, checked, onClick, error }) => {
  return (
    <label className={classnames("form-check", {
      "form-check--error": error
    })} htmlFor={id}>
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
             checked={checked}
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
  checked: PropTypes.bool,
  onClick: PropTypes.func
}

export default Checkbox
