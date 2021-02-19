import React from "react"
import PropTypes from "prop-types"

import Amount from "@components/Display/Amount"

import "./SliderProduct.scss"

const SliderProduct = ({ product, xsHeight }) => {
  return (
    <article
      className={`slider-product-card ${xsHeight ? "slider-product-card--xs-height" : ""}`}
      style={{
        backgroundImage: `url(${product.image})`
      }}
    >
      {product.type &&
        <div
          className="slider-product-card__head-desc"
          dangerouslySetInnerHTML={{ __html: product.type }}
        />
      }

      {product.title &&
        <div
          className="slider-product-card__head-title"
          dangerouslySetInnerHTML={{ __html: product.title }}
        />
      }

      {product.product_category &&
        <div className="slider-product-card__category">
          {product.product_category}
        </div>
      }

      {product.product_name &&
        <h3 className="slider-product-card__name">
          {product.product_name}
        </h3>
      }

      {product.discount_price &&
        <div className="slider-product-card__old-price">
          <Amount
            amount={product.discount_price}
            old
          />
        </div>
      }

      {product.price &&
        <div className="slider-product-card__current-price">
          <Amount
            amount={product.price}
          />
        </div>
      }
    </article>
  )
}

SliderProduct.propTypes = {
  product: PropTypes.object.isRequired,
  xsHeight: PropTypes.bool
}

export default SliderProduct
