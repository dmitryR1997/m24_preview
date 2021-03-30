import axios from "axios"
const prod = process.env.NODE_ENV === "production"

const api = axios.create({
  withCredentials: prod
})

axios.defaults.withCredentials = true

export const addOrder = params => api.post("https://massagery24.ru/api/mobile/order/add.php", params)
export const addToCrm = id => api.get(`https://massagery24.ru/api/mobile/order/crm.php?ORDER_ID=${id}`)
export const callMe = params => api.post("https://massagery24.ru/gravitel/callback.php", params)
export const oneClickBuy = params => api.post("https://massagery24.ru/bitrix/components/m24/buy.one.click/mobile.php", params)
