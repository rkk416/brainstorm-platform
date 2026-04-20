// import axios from "axios"

// export default axios.create({
// baseURL:"http://localhost:5000"
// })

import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000"
})

export default api