import App from "next/app"
import { wrapper } from "../store"
import { useStore } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

// General styles
import "../styles/general.scss"

// Plugins styles
import "swiper/swiper.scss"

function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state)

  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <Component {...pageProps} />
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp)
