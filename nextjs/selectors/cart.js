import { createSelector } from "reselect"

export const getItems = (state) => state.cart.list

export const getCartQuantity = createSelector(
  [ getItems ],
  (items) => {
    return items.reduce((prev, cur) => {
      if (typeof cur.quantity !== "number") return prev

      return parseInt(prev) + parseInt(cur.quantity)
    }, 0)
  }
)
