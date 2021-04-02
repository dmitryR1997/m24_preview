import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"

import Amount from "@components/Display/Amount"
import Slider from "@components/Surfaces/Slider"

import getProdutLink from "@utils/getProdutLink"

import "./Product.scss"

import PlayIcon from "../../../public/icons/play-button.svg"
import ComparisonIcon from "../../../public/icons/comparison.svg"
import NoneVideoIcon from "../../../public/icons/info.svg"
import VideoPlayer from "@components/Surfaces/VideoPlayer";
import AddToCart from "@components/Utils/AddToCart/AddToCart";

const Product = ({ product }) => {
  return (
    <article
      className="product-card"
    >
      {product.label &&
        <div className="product-card__label">
          {product.label.map((label, key) => (
            <div key={key}
                 className="product-card__label-item"
            >
              {label}
            </div>
          ))}
        </div>
      }

      {product.images && product.images.length > 0
        ? <div className="product-card__slider">
            <Link href={getProdutLink(product)}>
              <a href={getProdutLink(product)}>
                <Slider
                  pagination
                >
                  {product.images.map((image, key) => (
                    <div key={key}
                         className="product-card__slider-item"
                    >
                      <img src={image} alt="Product image" />
                    </div>
                  ))}
                </Slider>
              </a>
            </Link>
          </div>

        : <div className="product-card__image-none">
            <Link href={getProdutLink(product)}>
              <a href={getProdutLink(product)}>
                <img src="/images/image-not-found.svg" alt="Product Image None"/>
              </a>
            </Link>
          </div>
      }

      {product.category &&
        <div className="product-card__category">
          {product.category}
        </div>
      }

      {product.name &&
        <div className="product-card__name">
          {product.name}
        </div>
      }

      {product.discount_price > 0 &&
        <div className="product-card__old-price">
          <Amount
            amount={product.price}
            old
          />
        </div>
      }

      <div className="product-card__current-price">
        <Amount
          amount={product.discount_price > 0 ? product.discount_price : product.price}
        />
      </div>

      <div className="product-card__nav">
        <div className="product-card__nav-item">
          <div style={{ width: 32 }} />
          {product.video
            ? <>
                <VideoPlayer videoId={product.video} icon={<PlayIcon/>} />
              </>
            : <Link href={getProdutLink(product)}><span><NoneVideoIcon/></span></Link>
          }
        </div>

        <div className="product-card__nav-item">
          <AddToCart
            product={product}
            text="Купить"
          />
        </div>

        <div className="product-card__nav-item">
          <div style={{ width: 32 }} />
          {/*<ComparisonIcon/>*/}
        </div>
      </div>
    </article>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired
}


export default Product
