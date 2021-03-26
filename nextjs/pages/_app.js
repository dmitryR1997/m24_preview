import React, { useEffect } from "react"
import { useRouter } from "next/router"

import { useStore, PersistGateServer } from '../store'
import { Provider, useDispatch } from "react-redux"
import { persistStore } from 'redux-persist'
import { PersistGate as PersistGateClient } from 'redux-persist/integration/react'

import { isServer } from '../env'

import TagManager from "react-gtm-module"
const tagManagerArgs = {
  gtmId: "GTM-NKKVLD4"
}

import { hideHeaderSearch, hideMainMenu } from "@actions/layout"

import Loader from "@components/Layout/Loader"

// General styles
import "../styles/general.scss"

// Plugins styles
import "swiper/swiper.scss"

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store)
  const PersistGate = isServer ? PersistGateServer : PersistGateClient

  const router = useRouter()

  useEffect(()=> {
    TagManager.initialize(tagManagerArgs)

    router.events.on("routeChangeComplete", () => {
      window.scrollTo({
        top: 0,
        behavior: "instant"
      })

      store.dispatch(hideMainMenu())
      store.dispatch(hideHeaderSearch())
    })
  },[])

  return (
    <Provider store={store}>
      <PersistGate
        loading={<Loader/>}
        persistor={persistor}
      >
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default MyApp
