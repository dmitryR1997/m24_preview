import api from "./index"

export const fetchReviews = code => api.get(`review/list.php?code=${code}`)
export const addReview = params => api.post("review/add.php", params)
