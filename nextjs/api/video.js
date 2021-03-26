import api from "./index"

export const fetchVideos = async (params) => api.get("video/list.php", { params })
