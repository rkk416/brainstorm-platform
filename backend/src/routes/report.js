const router = require("express").Router()
const db = require("../config/db")

router.get("/:sessionId", async (req,res)=>{

const {sessionId} = req.params

const result = await db.query(
`
SELECT content, category, votes
FROM ideas
WHERE session_id=$1
ORDER BY votes DESC
`,
[sessionId]
)

let report = "Brainstorm Session Report\n\n"

result.rows.forEach((idea,index)=>{

report += `${index+1}. ${idea.content}\n`
report += `Category: ${idea.category}\n`
report += `Votes: ${idea.votes}\n\n`

})

res.setHeader("Content-Type","text/plain")

res.send(report)

})

module.exports = router
