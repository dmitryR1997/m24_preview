import { useEffect } from "react"
import { useRouter } from "next/router"
import { wrapper } from "../store"
import { useDispatch, useStore } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { hideHeaderSearch, hideMainMenu } from "@actions/layout"

import Loader from "@components/Layout/Loader"

// General styles
import "../styles/general.scss"

// Plugins styles
import "swiper/swiper.scss"

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const store = useStore((state) => state)

  useEffect(()=> {
    router.events.on("routeChangeComplete", () => {
      window.scrollTo({
        top: 0,
        behavior: "instant"
      })

      dispatch(hideMainMenu())
      dispatch(hideHeaderSearch())
    })
  },[])

  return (
    <PersistGate persistor={store.__persistor} loading={<Loader/>}>
      <Component {...pageProps} />
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp)
