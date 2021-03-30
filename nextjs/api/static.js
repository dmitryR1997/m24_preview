import api from "./index"

export const fetchStatic = async slug => api.get(`static/single.php?slug=${slug}`)
