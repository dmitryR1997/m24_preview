import { combineReducers } from "redux"

import layout from "./layout"
import category from "./category"
import filter from "./filter"
import product from "./product"
import cart from "./cart"

const root = combineReducers({
  layout,
  category,
  product,
  filter,
  cart
})

export default root
