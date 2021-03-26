import axios from "axios"
import { setupCache } from "axios-cache-adapter"
const prod = process.env.NODE_ENV === "production"

const cache = setupCache({
  maxAge: 60 * 1000,
  exclude: {
    q: false
  }
})

const apiUrl = "https://dev.massagery24.ru/api/"

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: prod,
  adapter: cache.adapter
})

axios.defaults.withCredentials = true

export default api
