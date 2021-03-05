import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHANGE_QUANTITY,
  CLEAR_CART
} from "@actions/cart"

export const initialState = {
  list: []
}

const cart = (state = initialState, action) => {
  let index = false

  switch (action.type) {
    case ADD_TO_CART:
      index = state.list.findIndex(item => item.id === action.payload.id)

      if (index !== -1) {
        return {
          ...state,
          list: state.list.filter(item => item.id !== action.payload.id)
        }
      }

      return {
        ...state,
        list: [...state.list, { id: action.payload.id, quantity: action.payload.quantity }]
      }

    case REMOVE_FROM_CART:
      index = state.list.findIndex(item => item.id === action.payload)

      if (index !== -1) {
        return {
          ...state,
          list: state.list.filter(item => item.id !== action.payload)
        }
      }

      return state

    case CHANGE_QUANTITY:
      index = state.list.findIndex(item => item.id === action.productId)

      const newArray = [...state.list]
      newArray[index].quantity = action.value

      return {
        ...state,
        list: newArray
      }

    case CLEAR_CART:
      console.log(state)
      return {
        ...state,
        list: []
      }

    default:
      return state
  }
}

export default cart
