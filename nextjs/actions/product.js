export const FETCH_PRODUCTS_BEGIN = "FETCH_PRODUCTS_BEGIN"
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS"
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE"
export const CLEAR_PRODUCTS = "CLEAR_PRODUCTS"
export const FETCH_PRODUCT_BEGIN = "FETCH_PRODUCT_BEGIN"
export const FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS"
export const FETCH_PRODUCT_FAILURE = "FETCH_PRODUCT_FAILURE"

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
})

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
})

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
})

export const clearProducts = () => ({
  type: CLEAR_PRODUCTS
})
