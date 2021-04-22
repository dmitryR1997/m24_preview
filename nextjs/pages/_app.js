import React, { useEffect } from "react"
import { useRouter } from "next/router"

import { useStore } from '../store'
import { Provider } from "react-redux"
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { hideHeaderSearch, hideMainMenu, hideModal } from "@actions/layout"

import { isServer } from "../env"

import TagManager from "react-gtm-module"
const tagManagerArgs = {
  gtmId: "GTM-NKKVLD4"
}

import Loader from "@components/Layout/Loader"

// General styles
import "../styles/general.scss"

// Plugins styles
import "swiper/swiper.scss"

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store)

  const router = useRouter()

  useEffect(()=> {
    if(process.env.NODE_ENV === "production") TagManager.initialize(tagManagerArgs)

    router.events.on("routeChangeComplete", () => {
      window.scrollTo({
        top: 0,
        behavior: "instant"
      })

      store.dispatch(hideMainMenu())
      store.dispatch(hideHeaderSearch())
      store.dispatch(hideModal())
    })
  },[])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps}/>
      </PersistGate>
    </Provider>
  )
}


export default MyApp
