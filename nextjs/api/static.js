import api from "./index"

export const fetchStatic = slug => api.get(`static/single.php?slug=${slug}`)
