export const SET_FILTER = "SET_FILTER"
export const UPDATE_FILTER = "UPDATE_FILTER"
export const SET_VIDEO_FILTER = "SET_VIDEO_FILTER"
export const UPDATE_VIDEO_FILTER = "UPDATE_VIDEO_FILTER"

export const setFilter = payload => {
  return {
    type: SET_FILTER,
    payload
  }
}

export const updateFilter = payload => {
  return {
    type: UPDATE_FILTER,
    payload
  }
}

export const setVideoFilter = payload => {
  return {
    type: SET_VIDEO_FILTER,
    payload
  }
}

export const updateVideoFilter = payload => {
  return {
    type: UPDATE_VIDEO_FILTER,
    payload
  }
}
