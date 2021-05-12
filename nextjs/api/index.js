import axios from "axios"
import { setupCache } from "axios-cache-adapter"
const prod = process.env.NODE_ENV === "production"

const cache = setupCache({
  maxAge: 60 * 1000,
  exclude: {
    q: false
  }
})

const apiMode = prod ? "api" : "api-dev"
const apiUrl = `https://dev.massagery24.ru/${apiMode}/`

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: prod,
  adapter: prod ? cache.adapter : false
})

axios.defaults.withCredentials = prod

export default api
