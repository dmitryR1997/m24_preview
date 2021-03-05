import api from "./index"


export const addOrder = params => api.post("order/add.php", params)
