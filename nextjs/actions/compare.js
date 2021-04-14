export const ADD_TO_COMPARE = "ADD_TO_COMPARE"
export const REMOVE_FROM_COMPARE = "REMOVE_FROM_COMPARE"
export const CHANGE_QUANTITY = "CHANGE_QUANTITY"
export const CLEAR_COMPARE = "CLEAR_COMPARE"

export const addToCompare = (payload) => {
  return {
    type: ADD_TO_COMPARE,
    payload
  }
}

export const removeFromCompare = (payload) => {
  return {
    type: REMOVE_FROM_COMPARE,
    payload
  }
}

export const clearCompare = () => {
  return {
    type: CLEAR_COMPARE
  }
}
