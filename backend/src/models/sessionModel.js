const { pool } = require("../config/db")

exports.createSession = async (title, description) => {

const result = await pool.query(
"INSERT INTO sessions(title,description) VALUES($1,$2) RETURNING *",
[title,description]
)

return result.rows[0]

}

exports.getSessions = async () => {

const result = await pool.query(
"SELECT * FROM sessions ORDER BY id DESC"
)

return result.rows

}
