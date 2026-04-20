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

app.use(cors())
app.use(express.json())

// Routes
app.use("/ideas", ideaRoutes)
app.use("/votes", voteRoutes)
app.use("/users", userRoutes)
app.use("/sessions", sessionRoutes)
app.use("/report",reportRoutes)


// Create HTTP server
const server = http.createServer(app)

// Setup Socket.io
const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

// Load socket logic
require("./sockets/socket")(io)

// Start server
createAdmin()
server.listen(5000, () => {
  console.log("Server running on port 5000")
})
