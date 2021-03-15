import api from "./index"


export const fetchBrands = params => api.get("brand/list.php", { params })
export const fetchBrand = code => api.get(`brand/single.php?code=${code}`)
