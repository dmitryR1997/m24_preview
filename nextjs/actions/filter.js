export const SET_FILTER = "SET_FILTER"
export const UPDATE_FILTER = "UPDATE_FILTER"

export const setFilter = (payload) => {
  return {
    type: SET_FILTER,
    payload
  }
}

export const updateFilter = (payload) => {
  return {
    type: UPDATE_FILTER,
    payload
  }
}
