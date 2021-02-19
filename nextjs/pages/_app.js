import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { Provider } from "react-redux"
import { persistStore } from "redux-persist"
import { useRouter } from "next/router"

import { useStore, PersistGateServer } from "../store"

// General styles
import "../styles/general.scss"

// Plugins styles
import "swiper/swiper.scss"

const App = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState)

  const router = useRouter()

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      window.scrollTo({
        top: 0,
        behavior: "instant"
      })
    })
  }, [])

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}

export default App
