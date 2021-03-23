import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"

import Amount from "@components/Display/Amount"

import "./ProductOneClick.scss"

const ProductOneClick = ({ product }) => {
  return (
    <Link href={`/catalog/${product.category_code}/${product.code}`}>
      <a href={`/catalog/${product.category_code}/${product.code}`}>
        <article
          className="product-one-click"
        >
          <div className="product-one-click__image">
            {product.images && product.images.length > 0
              ? <img src={product.images[0]} alt="Product Image" />
              : <img src="/images/image-not-found.svg" alt="Product Image"/>
            }
          </div>
          <div className="product-one-click__details">
            {product.name &&
              <div className="product-one-click__name">
                {product.name}
              </div>
            }

            <div className="product-one-click__price">
              {product.discount_price > 0 &&
              <div className="product-one-click__old-price">
                <Amount
                  amount={product.price}
                  old
                />
              </div>
              }

              <div className="product-one-click__current-price">
                <Amount
                  amount={product.discount_price ? product.discount_price : product.price}
                />
              </div>
            </div>
          </div>
        </article>
      </a>
    </Link>
  )
}

ProductOneClick.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductOneClick
