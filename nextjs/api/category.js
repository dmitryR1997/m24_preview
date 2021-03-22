import api from "./index"

export const fetchCategories = () => api.get("category/list.php")
export const fetchCategory = code => api.get(`category/single.php?code=${code}`)
export const fetchMinMaxPrices = code => api.get(`category/min_and_max_price.php?section_id=${code}`)
export const fetchFilters = (code, filters) => api.post(`category/filter.php`, { code, filters })
