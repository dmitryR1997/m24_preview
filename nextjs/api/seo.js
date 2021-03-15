import api from "./index"

export const fetchSeo = url => api.get(`seo/single.php?name=${url}`)
export const fetchSeoHome = () => api.get("seo/home.php")
