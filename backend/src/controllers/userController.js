const db = require("../config/db")
const bcrypt = require("bcrypt")
const crypto = require("crypto")

const JWT_SECRET = process.env.JWT_SECRET || "brainstorm-dev-secret"

// Create a minimal HS256 JWT without adding a new dependency.
const createToken = (user) => {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url")
  const payload = Buffer.from(JSON.stringify({
    id: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
  })).toString("base64url")
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${header}.${payload}`)
    .digest("base64url")

  return `${header}.${payload}.${signature}`
}

// Validate the saved JWT sent from the frontend Authorization header.
const verifyToken = (token) => {
  const [header, payload, signature] = token.split(".")

  if (!header || !payload || !signature) {
    return null
  }

  const expectedSignature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${header}.${payload}`)
    .digest("base64url")

  if (signature !== expectedSignature) {
    return null
  }

  let decoded

  try {
    decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"))
  } catch (err) {
    return null
  }

  if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
    return null
  }

  return decoded
}

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" })
    }

    const existingUser = await db.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    )

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    let role = "user"
    if (email === "admin@brainstorm.com") {
      role = "admin"
    }

    const newUser = await db.query(
      "INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *",
      [name, email, hashedPassword, role]
    )

    res.json(newUser.rows[0])

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" })
    }

    const result = await db.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" })
    }

    const user = result.rows[0]

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return res.status(400).json({ message: "Invalid password" })
    }

    // Keep the existing user payload and add a JWT for frontend session persistence.
    res.json({ ...user, token: createToken(user) })

  } catch (err) {
    console.error("LOGIN ERROR:", err)
    res.status(500).json({ message: "Server error" })
  }
}

// RESTORE SESSION
const getCurrentUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization || ""
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null

    if (!token) {
      return res.status(401).json({ message: "Token required" })
    }

    const decoded = verifyToken(token)

    if (!decoded) {
      return res.status(401).json({ message: "Invalid or expired token" })
    }

    const result = await db.query(
      "SELECT id,name,email,role FROM users WHERE id=$1",
      [decoded.id]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User not found" })
    }

    // Return the current user so the frontend can restore auth state after refresh.
    res.json(result.rows[0])

  } catch (err) {
    console.error("ME ERROR:", err)
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser
}
