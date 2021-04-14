import api from "./index"

export const fetchShops = params => api.get("shop/list.php", { params })
export const getShopAddress = params => api.post("https://massagery24.ru/api/get_sms_adress/", params, { withCredentials: true })
