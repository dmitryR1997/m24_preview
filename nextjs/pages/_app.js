import {useRouter} from "next/router"
import React, {useEffect} from "react"

import {useStore} from '../store'
import {Provider} from "react-redux"
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import {hideHeaderSearch, hideMainMenu, hideModal} from "@actions/layout"

import TagManager from "react-gtm-module"

const tagManagerArgs = {
  gtmId: "GTM-NKKVLD4"
}

// General styles
import "@styles/general.scss"

// Plugins styles
import "swiper/swiper.scss"

// Pages styles
import "@styles/pages/AddReview.scss"
import "@styles/pages/Articles.scss"
import "@styles/pages/Brands.scss"
import "@styles/pages/Cart.scss"
import "@styles/pages/Catalog.scss"
import "@styles/pages/Compare.scss"
import "@styles/pages/Contacts.scss"
import "@styles/pages/Getcredit.scss"
import "@styles/pages/Home.scss"
import "@styles/pages/None.scss"
import "@styles/pages/Order.scss"
import "@styles/pages/Product.scss"
import "@styles/pages/Reviews.scss"
import "@styles/pages/Static.scss"
import "@styles/pages/VideoReviews.scss"
import "@styles/pages/Promotions.scss"

function MyApp({Component, pageProps}) {
  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store)

  const router = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV === "production") TagManager.initialize(tagManagerArgs)

    router.events.on("routeChangeComplete", () => {
      window.scrollTo({
        top: 0,
        behavior: "instant"
      })

      store.dispatch(hideMainMenu())
      store.dispatch(hideHeaderSearch())
      store.dispatch(hideModal())
    })
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps}/>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
