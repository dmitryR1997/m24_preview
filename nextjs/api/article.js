import api from "./index"

export const fetchArticles = params => api.get("article/list.php", { params })
export const fetchArticle = async code => api.get(`article/single.php?code=${code}`)
