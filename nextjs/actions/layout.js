export const TOGGLE_MAIN_MENU = "TOGGLE_MAIN_MENU"
export const HIDE_MAIN_MENU = "HIDE_MAIN_MENU"

export const TOGGLE_HEADER_SEARCH = "TOGGLE_HEADER_SEARCH"
export const HIDE_HEADER_SEARCH = "HIDE_HEADER_SEARCH"
export const SET_HEADER_OFFSET_BOTTOM = "SET_HEADER_OFFSET_BOTTOM"

export const TOGGLE_CATALOG_FILTER = "TOGGLE_CATALOG_FILTER"

export const TOGGLE_VIDEO_FILTER = "TOGGLE_VIDEO_FILTER"
export const HIDE_VIDEO_FILTER = "HIDE_VIDEO_FILTER"

export const OPEN_MODAL = "OPEN_MODAL"
export const HIDE_MODAL = "HIDE_MODAL"

export const toggleMainMenu = () => {
  return {
    type: TOGGLE_MAIN_MENU
  }
}

export const hideMainMenu = () => {
  return {
    type: HIDE_MAIN_MENU
  }
}

export const toggleHeaderSearch = () => {
  return {
    type: TOGGLE_HEADER_SEARCH
  }
}

export const hideHeaderSearch = () => {
  return {
    type: HIDE_HEADER_SEARCH
  }
}

export const setHeaderOffsetBottom = (offset) => {
  return {
    type: SET_HEADER_OFFSET_BOTTOM,
    payload: offset
  }
}

export const toggleCatalogFilter = () => {
  return {
    type: TOGGLE_CATALOG_FILTER
  }
}

export const toggleVideoFilter = () => {
  return {
    type: TOGGLE_VIDEO_FILTER
  }
}

export const openModal = (content) => {
  return {
    type: OPEN_MODAL,
    payload: content
  }
}

export const hideModal = () => {
  return {
    type: HIDE_MODAL,
    payload: false
  }
}
