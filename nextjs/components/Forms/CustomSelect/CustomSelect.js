import PropTypes from "prop-types"
import classnames from "classnames"
import Select from "react-select"

import "./CustomSelect.scss"

const CustomSelect = ({ options, placeholder, onChange, defaultValue, error }) => {
  return (
    <div className={classnames("select", {
      "select--error": error
    })}>
      <Select
        className={classnames("custom-select", {
          "custom-select--error": error
        })}
        classNamePrefix="custom-select"
        options={options}
        placeholder={placeholder}
        value={defaultValue || ""}
        onChange={onChange}
        styles={{
          control: () => ({}),
          valueContainer: () => ({}),
          menu: () => ({}),
          option: () => ({}),
          dropdownIndicator: () => ({})
        }}
      />
    </div>
  )
}

CustomSelect.propTypes = {
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  defaultValue: PropTypes.any,
  error: PropTypes.bool
}

export default CustomSelect
