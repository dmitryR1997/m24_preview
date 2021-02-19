import api from "./index"


export const fetchVideos = params => api.get("video/list.php", { params })
