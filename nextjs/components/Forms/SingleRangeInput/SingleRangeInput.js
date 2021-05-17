import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Range } from "react-range"
import { useController } from "react-hook-form"

import "@components/Forms/RangeInput/RangeInput.scss"

const SingleRangeInput = ({ min, max, label, valueLabel, control, name, value, step }) => {
  const {
    field: { ref, ...inputProps }
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: value,
  })

  const [range, setRange] = useState([inputProps.value])

  const getTrackPos = () => {
    const current = range[0] / max * 100

    return {
      width: `${current}%`
    }
  }

  useEffect(() => {
    inputProps.onChange(range)
  }, [range])

  // useEffect(() => {
  //   setter(range[0])
  // }, [range])

  return (
    <Range
      values={range}
      step={step}
      min={min}
      max={max}
      onChange={values => setRange(values)}
      renderTrack={({ props, children }) => (
        <>
          {label &&
            <div className="range-header">
              <div className="range-header__label">
                {label}
              </div>
              <div className="range-header__value">
                {range[0]}{valueLabel && valueLabel}
              </div>
            </div>
          }
          <div className="range-input range-input--single" ref={props.ref} onMouseDown={props.onMouseDown} onTouchStart={props.onTouchStart}>
            <div className="range-input__track" style={getTrackPos()} />
            {children}
          </div>
        </>
      )}
      renderThumb={({ props, isDragged }) => (
        <div {...props} className="range-input__thumb" />
      )}
    />
  )
}

SingleRangeInput.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string,
  valueLabel: PropTypes.string,
  value: PropTypes.number
}

export default SingleRangeInput
