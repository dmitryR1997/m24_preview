import api from "./index"


export const fetchShops = params => api.get("shop/list.php", { params })
