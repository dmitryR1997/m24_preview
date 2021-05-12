import axios from "axios"
const prod = process.env.NODE_ENV === "production"

axios.defaults.withCredentials = prod

export const addOrder = params => axios.post("https://massagery24.ru/api/mobile/order/add.php", params,{ withCredentials: true })
export const addToCrm = (id, roistat_visit) => axios.get(`https://massagery24.ru/api/mobile/order/crm.php?ORDER_ID=${id}&roistat_visit=${roistat_visit}`,{ withCredentials: true })
export const callMe = params => axios.post("https://massagery24.ru/gravitel/callback.php", params, { withCredentials: true })
export const oneClickBuy = params => axios.post("https://massagery24.ru/bitrix/components/m24/buy.one.click/mobile.php", params,{ withCredentials: true })
export const addPreOrder = params => axios.post("https://massagery24.ru/api/preorder/index.php", params,{ withCredentials: true })
export const getCredit = params => axios.post("https://massagery24.ru/api/credit_line_gate/api/set_order/index.php", params, { withCredentials: true })
