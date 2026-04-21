require("dotenv").config()

const express = require("express")
const cors = require("cors")
const http = require("http")
const { Server } = require("socket.io")

const ideaRoutes = require("./routes/ideas")
const voteRoutes = require("./routes/votes")
const userRoutes = require("./routes/users")
const sessionRoutes = require("./routes/sessions")
const reportRoutes = require("./routes/report")
const createAdmin = require("./utils/createAdmin")

const app = express()
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://brainstorm-platform-g7lr59e0u-rkk416s-projects.vercel.app",
    "https://brainstorm-platform-git-master-rkk416s-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

app.use(express.json())

// Routes
app.use("/ideas", ideaRoutes)
app.use("/votes", voteRoutes)
app.use("/users", userRoutes)
app.use("/sessions", sessionRoutes)
app.use("/report", reportRoutes)

// Server
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

require("./sockets/socket")(io)

createAdmin()

server.listen(process.env.PORT || 5000, () => {
  console.log("Server running")
})
