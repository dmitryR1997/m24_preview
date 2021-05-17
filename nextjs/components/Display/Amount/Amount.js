import {useRef, useEffect, useState} from "react"
import PropTypes from "prop-types"

import "./Amount.scss"

const Amount = ({amount, old, text}) => {
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
      {amount.toLocaleString("ru", {minimumFractionDigits: 0, maximumFractionDigits: 0})} ₽{text && text}

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
  old: PropTypes.bool,
  text: PropTypes.string
}

export default Amount
