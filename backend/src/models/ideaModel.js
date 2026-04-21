const { pool } = require("../config/db")

exports.createIdea = async (sessionId, content, category, userId) => {

const result = await pool.query(
"INSERT INTO ideas(session_id,content,category,created_by) VALUES($1,$2,$3,$4) RETURNING *",
[sessionId,content,category,userId]
)

return result.rows[0]

}

exports.getIdeas = async (sessionId) => {

const result = await pool.query(
`
SELECT ideas.*, users.name AS author
FROM ideas
LEFT JOIN users ON ideas.created_by = users.id
WHERE session_id=$1
ORDER BY votes DESC
`,
[sessionId]
)

return result.rows

}
