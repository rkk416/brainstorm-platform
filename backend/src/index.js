require("dotenv").config()

const express = require("express")
const cors = require("cors")
const http = require("http")
const { Server } = require("socket.io")

// Routes
const ideaRoutes = require("./routes/ideas")
const voteRoutes = require("./routes/votes")
const userRoutes = require("./routes/users")
const sessionRoutes = require("./routes/sessions")
const reportRoutes = require("./routes/report")

// Utils
const createAdmin = require("./utils/createAdmin")
const { initDB } = require("./config/db")

const app = express()

app.use(cors({
  origin: true,       
  credentials: true
}))

app.use(express.json())

app.use("/ideas", ideaRoutes)
app.use("/votes", voteRoutes)
app.use("/users", userRoutes)
app.use("/sessions", sessionRoutes)
app.use("/report", reportRoutes)

app.get("/fix-db", async (req, res) => {
  try {
    await require("./config/db").query(`
      ALTER TABLE sessions ADD COLUMN description TEXT;
    `)

    res.send("✅ description column added")
  } catch (err) {
    console.error(err)
    res.send("❌ " + err.message)
  }
})
// Server
const server = http.createServer(app)

// Socket.io
const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

require("./sockets/socket")(io)

async function startServer() {
  try {
    await initDB()       
    await createAdmin() 

    server.listen(process.env.PORT || 5000, () => {
      console.log("Server running")
    })

  } catch (err) {
    console.error("❌ Startup error:", err)
  }
}

startServer()
