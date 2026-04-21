const db = require("../config/db")
const bcrypt = require("bcrypt")

const createAdmin = async () => {
  try {

    const existing = await db.query(
      "SELECT * FROM users WHERE email=$1",
      ["ramkrishn@gmail.com"]
    )

    if (existing.rows.length === 0) {

      const hashedPassword = await bcrypt.hash("12345", 10)

      await db.query(
        "INSERT INTO users (name,email,role,password) VALUES ($1,$2,$3,$4)",
        ["Ram Krishna", "ramkrishn@gmail.com", "admin", hashedPassword]
      )

      console.log("✅ Admin created")
    }

  } catch (err) {
    console.error("❌ Admin error:", err)
  }
}

module.exports = createAdmin
