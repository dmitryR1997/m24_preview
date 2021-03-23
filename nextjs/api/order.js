import axios from "axios"
import api from "./index"

export const addOrder = params => axios.post("https://massagery24.ru/api/mobile/order/add.php", params)
export const addToCrm = id => axios.get(`https://massagery24.ru/api/mobile/order/crm.php?ORDER_ID=${id}`)
export const callMe = params => axios.post("https://massagery24.ru/gravitel/callback.php", params)
export const oneClickBuy = params => axios.post("https://massagery24.ru/bitrix/components/m24/buy.one.click/mobile.php", params)
