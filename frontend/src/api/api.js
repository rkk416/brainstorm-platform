// import axios from "axios"

// export default axios.create({
// baseURL:"http://localhost:5000"
// })

import axios from "axios"

const api = axios.create({
  baseURL: "https://brainstorm-backend-m8li.onrender.com"
})

export default api
