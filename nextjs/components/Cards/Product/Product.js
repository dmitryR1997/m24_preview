import PropTypes from "prop-types"
import Link from "next/link"
import classnames from "classnames"

import { connect, useDispatch } from "react-redux"
import { addToCompare } from "@actions/compare"

import Amount from "@components/Display/Amount"
import Slider from "@components/Surfaces/Slider"
import VideoPlayer from "@components/Surfaces/VideoPlayer"
import AddToCart from "@components/Utils/AddToCart/AddToCart"

import getProdutLink from "@utils/getProdutLink"

import "./Product.scss"

import PlayIcon from "../../../public/icons/play-button.svg"
import ComparisonIcon from "../../../public/icons/comparison.svg"
import NoneVideoIcon from "../../../public/icons/info.svg"

const Product = ({product, compareList}) => {
  const dispatch = useDispatch()

  console.log(product.labels)

  return (
    <article
      className="product-card"
    >
      {product.labels &&
      <div className="product-card__label">
        {Object.keys(product.labels).map((label, key) => {
          if (label === "credit_line") {
            return (
              <Link href={`/getcredit/${product.code}`}>
                <div key={key}
                     className="product-card__label-item"
                >
                  {product.labels[label]}
                </div>
              </Link>
            )
          } else {
            return (
              <div key={key}
                   className="product-card__label-item"
              >
                {product.labels[label]}
              </div>
            )
          }
        })}
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
                    <img src={image} alt="Product image"/>
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
          {product.video
            ? <>
              <VideoPlayer videoId={product.video} icon={<PlayIcon/>}/>
            </>
            : <Link href={getProdutLink(product)}><span><NoneVideoIcon/></span></Link>
          }
        </div>

        <div className="product-card__nav-item">
          <AddToCart
            product={product}
            text={(product.quantity > 0) || (product.can_buy_zero === "Y") ? "Купить" : "Предзаказ"}
          />
        </div>

        <div
          className={classnames("product-card__nav-item", {"product-card__nav-item--in-compare": compareList.some(item => item.id === parseInt(product.id))})}
          onClick={() => dispatch(addToCompare({id: product.id}))}
        >
          <ComparisonIcon/>
        </div>
      </div>
    </article>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  compareList: PropTypes.array.isRequired
}

const mapStateToolProps = state => {
  return {
    compareList: state.compare.list
  }
}

export default connect(mapStateToolProps)(Product)
