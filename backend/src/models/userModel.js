const db = require("../config/db")

exports.createUser = async (name,email)=>{

const result = await db.query(
"INSERT INTO users(name,email) VALUES($1,$2) RETURNING *",
[name,email]
)

return result.rows[0]

}
