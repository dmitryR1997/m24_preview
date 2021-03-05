import React, {useCallback, useState} from "react"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import classnames from "classnames"

import { connect, useDispatch } from "react-redux"
import { addToCart } from "@actions/cart"

import CartIcon from "../../../public/icons/add-to-cart.svg"

import "./AddToCart.scss"

const AddToCart = ({ id, cartList }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [inCart, setInCart] = useState(cartList.some(item => item.id === id))

  const addToCartHandler = useCallback(() => {
    if(!inCart) {
      dispatch(addToCart({id: parseInt(id), quantity: 1}))
    }

    router.push("/cart")
  }, [inCart, id])

  return (
    <div
      className={classnames("add-to-cart", {
        "add-to-cart--in": inCart
      })}
      onClick={addToCartHandler}
    >
      <CartIcon/>
    </div>
  )
}


AddToCart.propTypes = {
  id: PropTypes.number.isRequired,
  cartList: PropTypes.array.isRequired
}

const mapStateToolProps = state => {
  return {
    cartList: state.cart.list
  }
}

export default connect(mapStateToolProps)(AddToCart)
