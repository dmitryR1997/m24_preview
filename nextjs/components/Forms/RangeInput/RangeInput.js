import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Range } from "react-range"

import "./RangeInput.scss"

const STEP = 1

const RangeInput = ({ min, max, setter }) => {
  const [range, setRange] = useState({ values: [min, max] })

  const getTrackPos = () => {
    const start = range.values[0]
    const end = range.values[1]

    const left = ((start - min) / (max - min)) * 100
    const right = (100 - (((end - min) / (max - min)) * 100))

    return {
      left: `${left}%`,
      right: `${right}%`
    }
  }

  useEffect(() => {
    setter(range.values)
  }, [range])

  return (
    <>
      <Range
        values={range.values}
        step={STEP}
        min={min}
        max={max}
        onChange={values => setRange({ values })}
        renderTrack={({ props, children }) => (
          // eslint-disable-next-line react/prop-types
          <div className="range-input" ref={props.ref} onMouseDown={props.onMouseDown} onTouchStart={props.onTouchStart}>
            <div className="range-input__track" style={getTrackPos()} />
            {children}
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div {...props} className="range-label" />
        )}
      />

      <div className="range-value">
        <div className="range-value__item">
          {range.values[0]}
        </div>
        <div className="range-value__item">
          {range.values[1]}
        </div>
      </div>
    </>
  )
}

RangeInput.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  setter: PropTypes.func.isRequired
}

export default RangeInput
