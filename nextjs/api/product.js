import api from "./index"

export const fetchProducts = async params => api.get("product/list.php", { params })
export const fetchProduct = async code => api.get(`product/single.php?code=${code}`)
