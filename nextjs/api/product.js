import api from "./index"


export const fetchProducts = params => api.get("product/list.php", { params })
export const fetchProduct = code => api.get(`product/single.php?code=${code}`)
