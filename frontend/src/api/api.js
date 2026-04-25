// import axios from "axios"

// export default axios.create({
// baseURL:"http://localhost:5000"
// })

import axios from "axios"

const api = axios.create({
  baseURL: "https://brainstorm-backend-m8li.onrender.com"
})

// Attach the saved JWT to every API request so protected backend routes survive refreshes.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// If the backend rejects the token, clear it and let the app return to the login screen.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.dispatchEvent(new Event("auth:logout"))
    }

    return Promise.reject(error)
  }
)

export default api
