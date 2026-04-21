const db = require("../config/db")

exports.createIdea = async (req,res)=>{

try{

const {sessionId,content,category,author} = req.body

const result = await db.query(

"INSERT INTO ideas (session_id,content,category,author,votes) VALUES ($1,$2,$3,$4,0) RETURNING *",
[sessionId,content,category,author]

)

res.json(result.rows[0])

}catch(err){

console.error(err)
res.status(500).json({error:"Server error"})

}

}

exports.getIdeas = async (req,res)=>{

try{

const {sessionId} = req.params

const result = await db.query(

"SELECT * FROM ideas WHERE session_id=$1",
[sessionId]

)

res.json(result.rows)

}catch(err){

console.error(err)
res.status(500).json({error:"Server error"})

}

}

exports.deleteIdea = async (req,res)=>{

try{

const {ideaId} = req.params
const {userId} = req.body

const user = await db.query(
"SELECT role FROM users WHERE id=$1",
[userId]
)

if(user.rows[0].role !== "admin"){
return res.status(403).json({error:"Admin only"})
}

await db.query(
"DELETE FROM ideas WHERE id=$1",
[ideaId]
)

res.json({message:"Idea deleted"})

}catch(err){

console.error(err)
res.status(500).json({error:"Server error"})

}

}
