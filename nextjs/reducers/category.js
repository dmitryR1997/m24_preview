import {
  FETCH_CATEGORIES_BEGIN,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORY_BEGIN,
  FETCH_CATEGORY_FAILURE,
  FETCH_CATEGORY_SUCCESS
} from "@actions/category"

const initialState = {
  item: {},
  items: [],
  loading: false,
  error: null
}

const category = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.categories
      }

    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: []
      }

    case FETCH_CATEGORY_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.payload
      }

    case FETCH_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        item: []
      }

    default:
      return state
  }
}

export default category
