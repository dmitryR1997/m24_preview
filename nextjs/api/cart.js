import api from "./index"

export const fetchCartPrice = params => api.get("cart/get_basket_price.php", { params })
