import { combineReducers } from "redux"

import layout from "./layout"
import category from "./category"
import filter from "./filter"
import product from "./product"

const root = combineReducers({
  layout,
  category,
  product,
  filter
})

export default root
