import { useState } from "react"
import PropTypes from "prop-types"

import "./ProductParamsList.scss"

const defaultCount = 4

const ProductParamsList = ({ params }) => {
  const [count, setCount] = useState(defaultCount)

  const onClickHandler = () => {
    if (count === params.length) {
      setCount(defaultCount)
    } else {
      setCount(params.length)
    }
  }

  return (
    <div className="product-params">
      {count > 0 &&
        <div className="product-params__list">
          {params.slice(0, count).map((param, key) => (
            <div key={key}
                 className="product-params__item"
            >
              <div className="product-params__item-label">
                {param.label}
              </div>
              <div className="product-params__item-value">
                {param.value}
              </div>
            </div>
          ))}
        </div>
      }

      {params.length > defaultCount &&
        <div
          className="product-params__show-more"
          onClick={onClickHandler}
        >
          {count < params.length ? "Показать ещё" : "Свернуть"}
        </div>
      }
    </div>
  )
}

ProductParamsList.propTypes = {
  params: PropTypes.any
}

export default ProductParamsList
