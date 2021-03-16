import {
  SET_FILTER,
  UPDATE_FILTER,
  SET_VIDEO_FILTER,
  UPDATE_VIDEO_FILTER
} from "@actions/filter"

const initialState = {
  items: {},
  videoItems: {}
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

    case SET_VIDEO_FILTER:
      return {
        ...state,
        videoItems: action.payload
      }

    case UPDATE_VIDEO_FILTER:
      return {
        ...state,
        videoItems: {
          ...state.videoItems,
          [action.payload.field]: action.payload.value
        }
      }

    default:
      return state
  }
}

export default filter
