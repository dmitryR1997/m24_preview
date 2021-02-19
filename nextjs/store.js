import React, { useMemo } from "react"
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"

import rootReducer from "@reducers/root"

let store


function initStore (initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}

export class PersistGateServer extends React.Component {
  render () {
    return this.props.children
  }
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })

    store = undefined
  }

  if (typeof window === "undefined") {
    return _store
  }

  if (!store) {
    store = _store
  }

  return _store
}

export function useStore (initialState) {
  return useMemo(() => initializeStore(initialState), [initialState])
}
