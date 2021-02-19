import api from "./index"


export const fetchBrands = params => api.get("brand/list.php", { params })
