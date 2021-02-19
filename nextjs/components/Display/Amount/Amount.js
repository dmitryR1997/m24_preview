import React, { useRef, useEffect, useState } from "react"
import PropTypes from "prop-types"

import "./Amount.scss"

const Amount = ({ amount, old }) => {
  const [styleDeg, setStyleDeg] = useState(false)
  const amountBlock = useRef(null)

  const transformLine = () => {
    const width = amountBlock.current.clientWidth
    const height = amountBlock.current.clientHeight

    const d = Math.sqrt(height * height + width * width)
    const sin = height / d
    const deg = Math.asin(sin) * (180 / Math.PI)

    setStyleDeg(deg)
  }

  useEffect(() => {
    if (old) {
      transformLine()
    }
  }, [])

  return (
    <div className="amount" ref={amountBlock}>
      { amount.toLocaleString("ru") } ₽

      {old && styleDeg &&
        <div
          className="amount__line"
          style={{
            transform: `rotate(-${styleDeg}deg)`
          }}
        />
      }
    </div>
  )
}

Amount.propTypes = {
  amount: PropTypes.number.isRequired,
  old: PropTypes.bool
}

export default Amount
