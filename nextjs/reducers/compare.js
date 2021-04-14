import {
  ADD_TO_COMPARE,
  REMOVE_FROM_COMPARE,
  CHANGE_QUANTITY,
  CLEAR_COMPARE
} from "@actions/compare"

export const initialState = {
  list: []
}

const compare = (state = initialState, action) => {
  let index = false

  switch (action.type) {
    case ADD_TO_COMPARE:
      index = state.list.findIndex(item => item.id === action.payload.id)

      if (index !== -1) {
        return {
          ...state,
          list: state.list.filter(item => item.id !== action.payload.id)
        }
      }

      return {
        ...state,
        list: [...state.list, { id: action.payload.id, old_id: action.payload.old_id, quantity: action.payload.quantity }]
      }

    case REMOVE_FROM_COMPARE:
      index = state.list.findIndex(item => item.id === action.payload)

      if (index !== -1) {
        return {
          ...state,
          list: state.list.filter(item => item.id !== action.payload)
        }
      }

      return state

    case CLEAR_COMPARE:
      return {
        ...state,
        list: []
      }

    default:
      return state
  }
}

export default compare
