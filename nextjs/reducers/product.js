import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SUCCESS,
  CLEAR_PRODUCTS
} from "@actions/product"

const initialState = {
  item: {},
  items: [],
  total: 0,
  loading: false,
  error: null
}

const product = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_BEGIN:
      return { ...state, loading: true, error: null }

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items, ...action.payload.products.data],
        total: action.payload.products.total
      }

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: [],
        total: 0
      }

    case CLEAR_PRODUCTS:
      return {
        ...state,
        loading: false,
        items: [],
        total: 0
      }

    default:
      return state
  }
}

export default product
