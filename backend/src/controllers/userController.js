const { pool } = require("../config/db")
const bcrypt = require("bcrypt")

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" })
    }

    // check existing user
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    )

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" })
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // assign role
    let role = "user"
    if (email === "admin@brainstorm.com") {
      role = "admin"
    }

    // insert user
    const newUser = await pool.query(
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

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    )

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "User not found" })
    }

    const valid = await bcrypt.compare(password, user.rows[0].password)

    if (!valid) {
      return res.status(400).json({ message: "Invalid password" })
    }

    res.json(user.rows[0])

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = {
  registerUser,
  loginUser
}
