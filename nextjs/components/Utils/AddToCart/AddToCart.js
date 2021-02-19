import React from "react"
import classnames from "classnames"

import CartIcon from "@icons/add-to-cart.svg"

import "./AddToCart.scss"

const AddToCart = () => {
  const onClickHandler = () => {
  }

  return (
    <div
      className={classnames("add-to-cart", {
        "add-to-cart--in": false
      })}
      onClick={onClickHandler}
    >
      <CartIcon/>
    </div>
  )
}

export default AddToCart
