import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import "./Stars.scss"

const COUNT = 5
const LABELS = [
  "Очень плохо",
  "Плохо",
  "Сердне",
  "Хорошо",
  "Отлично"
]

import StarIcon from "../../../public/icons/star.svg"

const Stars = ({ value, starLabel, enableClickHandler, onChange }) => {
  const [active, setActive] = useState(value ? value : 3)
  const stars = [];

  const clickHandler = (i) => {
    if(!enableClickHandler) return

    setActive(i)
  }

  for (let i = 0; i < COUNT; i++) {
    stars.push(
      <div key={i}
           className={classnames("stars__item", {
             "stars__item--active": i <= active,
             "stars__item--last": i === active,
             "stars__item--has-label": starLabel
           })}
           onClick={() => clickHandler(i)}
      >
        <StarIcon/>

        {starLabel &&
          <div className="stars__item-label">{LABELS[i]}</div>
        }
      </div>
    )
  }

  useEffect(() => {
    if(onChange) {
      onChange(active + 1)
    }
  }, [active])

  return (
    <div className={classnames("stars")}>
      {stars}
    </div>
  )
}

Stars.propTypes = {
  value: PropTypes.number,
  starLabel: PropTypes.bool,
  enableClickHandler: PropTypes.bool,
  onChange: PropTypes.func
}

export default Stars
