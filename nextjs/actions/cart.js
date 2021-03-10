export const ADD_TO_CART = "ADD_TO_CART"
export const REMOVE_FROM_CART = "REMOVE_FROM_CART"
export const CHANGE_QUANTITY = "CHANGE_QUANTITY"
export const CLEAR_CART = "CLEAR_CART"

export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload
  }
}

export const removeFromCart = (payload) => {
  return {
    type: REMOVE_FROM_CART,
    payload
  }
}

export const clearCart = () => {
  return {
    type: CLEAR_CART
  }
}

export const changeQuantity = (productId, value) => {
  return {
    type: CHANGE_QUANTITY,
    productId,
    value
  }
}
