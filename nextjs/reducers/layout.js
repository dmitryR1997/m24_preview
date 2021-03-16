import {
  TOGGLE_MAIN_MENU,
  HIDE_MAIN_MENU,
  TOGGLE_HEADER_SEARCH,
  SET_HEADER_OFFSET_BOTTOM,
  TOGGLE_CATALOG_FILTER,
  TOGGLE_VIDEO_FILTER,
  OPEN_MODAL,
  HIDE_MODAL,
  HIDE_HEADER_SEARCH
} from "@actions/layout"

const initialState = {
  isOpenMainMenu: false,
  isOpenHeaderSearch: false,
  headerOffsetBottom: 0,
  isOpenModal: false,
  modalContent: false,
  isOpenCatalogFilter: false,
  isOpenVideoFilter: false
}

const layout = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MAIN_MENU:
      return { ...state, isOpenMainMenu: !state.isOpenMainMenu }

    case HIDE_MAIN_MENU:
      return { ...state, isOpenMainMenu: false }

    case TOGGLE_HEADER_SEARCH:
      return { ...state, isOpenHeaderSearch: !state.isOpenHeaderSearch }

    case HIDE_HEADER_SEARCH:
      return { ...state, isOpenHeaderSearch: false }

    case SET_HEADER_OFFSET_BOTTOM:
      return { ...state, headerOffsetBottom: action.payload }

    case TOGGLE_CATALOG_FILTER:
      return { ...state, isOpenCatalogFilter: !state.isOpenCatalogFilter }

    case TOGGLE_VIDEO_FILTER:
      return { ...state, isOpenVideoFilter: !state.isOpenVideoFilter }

    case OPEN_MODAL:
      return { ...state, isOpenModal: true, modalContent: action.payload }

    case HIDE_MODAL:
      return { ...state, isOpenModal: false, modalContent: false }

    default:
      return state
  }
}

export default layout
