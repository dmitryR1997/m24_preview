import api from "./index"

export const fetchSeo = url => api.get(`seo/single.php?name=${url}`)
export const fetchSeoHome = async () => api.get("seo/home.php")
