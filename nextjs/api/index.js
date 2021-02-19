import axios from "axios"
// import { setupCache } from "axios-cache-adapter"
//
// const cache = setupCache({
//   maxAge: 60 * 1000,
//   exclude: {
//     query: false
//   }
// })

const apiUrl = "https://dev.massagery24.ru/api/"

const api = axios.create({
  baseURL: apiUrl
  // withCredentials: true
  // adapter: cache.adapter
})

export default api
