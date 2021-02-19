import {
  SET_FILTER,
  UPDATE_FILTER
} from "@actions/filter"

const initialState = {
  items: []
}

const filter = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        items: action.payload
      }

    case UPDATE_FILTER:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.field]: action.payload.value
        }
      }

    default:
      return state
  }
}

export default filter
