const db = require("../config/db")
const bcrypt = require("bcrypt")

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

    res.json(user)

  } catch (err) {
    console.error("LOGIN ERROR:", err)
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = {
  registerUser,
  loginUser
}
