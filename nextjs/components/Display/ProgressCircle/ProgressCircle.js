import { useState, useEffect } from "react"
import PropTypes from "prop-types"

import "./ProgressCircle.scss"

const ProgressCircle = ({ precent, title }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = precent

    if (start === end) return

    const totalMilSecDur = 1
    const incrementTime = (totalMilSecDur / end) * 1000

    const timer = setInterval(() => {
      start += 1
      setCount(start)

      if (start === end) clearInterval(timer)
    }, incrementTime)
  }, [precent])

  return (
    <div className="progress-circle" data-progress={count}>
      <div className="progress-circle__circle">
        <div className="progress-circle__slice full">
          <div className="progress-circle__fill"/>
        </div>

        <div className="progress-circle__slice">
          <div className="progress-circle__fill"/>
        </div>

        <div className="progress-circle__overlay">{count}%</div>
      </div>

      <div className="progress-circle__title">
        {title}
      </div>
    </div>
  )
}

ProgressCircle.propTypes = {
  precent: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}

export default ProgressCircle
