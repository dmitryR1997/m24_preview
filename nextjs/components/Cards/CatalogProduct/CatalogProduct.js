import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import { LazyLoadImage } from "react-lazy-load-image-component"

import Amount from "@components/Display/Amount"

import "./CatalogProduct.scss"

const CatalogProduct = ({ product, size }) => {
  return (
    <article
      className={`catalog-product-card ${size === "xs" ? "catalog-product-card--xs" : ""}`}
    >
      <div className="catalog-product-card__inner">
        {product.discount_percent > 0 &&
          <div className="catalog-product-card__discount">
            {product.discount_percent} %
          </div>
        }

        {product.thumbnail
          ? <div className="catalog-product-card__image">
              <Link href={`/catalog/${product.category_code}/${product.code}`}>
                <a href={`/catalog/${product.category_code}/${product.code}`}>
                  <LazyLoadImage
                    src={product.thumbnail}
                    width={153}
                    height={153}
                    alt="Product image"
                  />
                </a>
              </Link>
            </div>

          : <div className="catalog-product-card__image-none">
              <Link href={`/catalog/${product.category_code}/${product.code}`}>
                <a href={`/catalog/${product.category_code}/${product.code}`}>
                  <img src="/images/image-not-found.svg" alt="Product Image None"/>
                </a>
              </Link>
            </div>
        }

        <div className="catalog-product-card__category">
          {product.category}
        </div>

        <h3 className="catalog-product-card__title">
          {product.name}
        </h3>

        {product.discount_price > 0 &&
          <div className="catalog-product-card__old-price">
            <Amount
              amount={product.price}
              old
            />
          </div>
        }

        <div className="catalog-product-card__current-price">
          <Amount
            amount={product.discount_price > 0 ? product.discount_price : product.price}
          />
        </div>
      </div>
    </article>
  )
}

CatalogProduct.propTypes = {
  product: PropTypes.object.isRequired,
  size: PropTypes.string.isRequired
}

export default CatalogProduct
