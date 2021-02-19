import api from "./index"

export const fetchArticles = params => api.get("article/list.php", { params })
export const fetchArticle = code => api.get(`article/single.php?code=${code}`)
