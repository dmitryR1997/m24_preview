import { combineReducers } from "redux"

import layout from "./layout"
import category from "./category"
import filter from "./filter"
import product from "./product"
import cart from "./cart"
import compare from "./compare"

const root = combineReducers({
  layout,
  category,
  product,
  filter,
  cart,
  compare
})

export default root
