const db = require("../config/db")

exports.createSession = async (title, description, userId) => {

  const result = await db.query(
    "INSERT INTO sessions(title,description,created_by) VALUES($1,$2,$3) RETURNING *",
    [title, description, userId]
  )

  return result.rows[0]
}

exports.getSessions = async () => {

  const result = await db.query(
    "SELECT * FROM sessions ORDER BY id DESC"
  )

  return result.rows
}
