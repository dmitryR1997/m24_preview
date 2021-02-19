import {CLEAR_PRODUCTS} from "@actions/product";

export const FETCH_CATEGORIES_BEGIN = "FETCH_CATEGORIES_BEGIN"
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS"
export const FETCH_CATEGORIES_FAILURE = "FETCH_CATEGORIES_FAILURE"
export const FETCH_CATEGORY_BEGIN = "FETCH_CATEGORY_BEGIN"
export const FETCH_CATEGORY_SUCCESS = "FETCH_CATEGORY_SUCCESS"
export const FETCH_CATEGORY_FAILURE = "FETCH_CATEGORY_FAILURE"

export const fetchCategoriesBegin = () => ({
  type: FETCH_CATEGORIES_BEGIN
})

export const fetchCategoriesSuccess = categories => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: { categories }
})

export const fetchCategoriesFailure = error => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: { error }
})

export const fetchCategoryBegin = () => ({
  type: FETCH_CATEGORY_BEGIN
})

export const fetchCategorySuccess = payload => ({
  type: FETCH_CATEGORY_SUCCESS,
  payload
})

export const fetchCategoryFailure = error => ({
  type: FETCH_CATEGORY_FAILURE,
  payload: { error }
})
