import PropTypes from "prop-types"
import Link from "next/link"

import { connect, useDispatch } from "react-redux"
import { changeQuantity, removeFromCart } from "@actions/cart"

import Amount from "@components/Display/Amount"

import "./ProductCart.scss"

import PlusIcon from "../../../public/icons/plus.svg"
import MinusIcon from "../../../public/icons/minus.svg"
import DeleteIcon from "../../../public/icons/delete.svg"

const ProductCart = ({ product, cartData }) => {
  const dispatch = useDispatch()

  const inputQuantityHandler = (e, id) => {
    const value = e.target.value

    return

    // dispatch(changeQuantity(id, value))
  }

  const navQuantityHandler = (id, direction) => {
    if (direction === "up") {
      if (cartData.quantity >= 99) return

      dispatch(changeQuantity(id, parseInt(cartData.quantity) + 1))
    } else {
      if (cartData.quantity <= 1) return

      dispatch(changeQuantity(id, parseInt(cartData.quantity) - 1))
    }
  }

  return (
    <article
      className="product-cart"
    >
      {/*<input type="hidden" className="gtm-category-id" value={} />*/}
      {/*<input type="hidden" className="gtm-product-id" value={product.id}>*/}
      {/*<input type="hidden" className="gtm-product-price" value={product.discount_price ? product.discount_price : product.price}>*/}

      <div className="product-cart__delete" onClick={() => dispatch(removeFromCart(product.id))}>
        <DeleteIcon/>
      </div>

      <Link href={`/catalog/${product.category_code}/${product.code}`}>
        <a href={`/catalog/${product.category_code}/${product.code}`}>
          <div className="product-cart__details">
            <div className="product-cart__image">
              {product.images && product.images.length > 0
                ? <img src={product.images[0]} alt="Product Image" />
                : <img src="/images/image-not-found.svg" alt="Product Image"/>
              }
            </div>

            {product.name &&
              <div className="product-cart__name">
                {product.name}
              </div>
            }
          </div>
        </a>
      </Link>

      <div className="product-cart__nav">
        <div className="product-cart__price">
          {product.discount_price > 0 &&
          <div className="product-cart__old-price">
            <Amount
              amount={product.price}
              old
            />
          </div>
          }

          <div className="product-cart__current-price">
            <Amount
              amount={product.discount_price ? product.discount_price : product.price}
            />
          </div>
        </div>

        <div className="product-cart__quantity">
          <div className="product-cart__quantity-nav"
               onClick={() => navQuantityHandler(product.id, "up")}
          >
            <PlusIcon/>
          </div>
          <div className="product-cart__quantity-input">
            <input
              type="number"
              min="1"
              max="99"
              value={parseInt(cartData.quantity)}
              onChange={(e) => inputQuantityHandler(e, product.id)}
            />
          </div>
          <div className="product-cart__quantity-nav"
               onClick={() => navQuantityHandler(product.id, "down")}
          >
            <MinusIcon/>
          </div>
        </div>
      </div>
    </article>
  )
}

ProductCart.propTypes = {
  product: PropTypes.object.isRequired,
  cartData: PropTypes.object.isRequired
}

const mapStateToolProps = state => {
  return {
    cartList: state.cart.list
  }
}

export default connect(mapStateToolProps)(ProductCart)
