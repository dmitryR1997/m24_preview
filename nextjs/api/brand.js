import api from "./index"


export const fetchBrands = params => api.get("brand/list.php", { params })
export const fetchBrand = async code => api.get(`brand/single.php?code=${code}`)
