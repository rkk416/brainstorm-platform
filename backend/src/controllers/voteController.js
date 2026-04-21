const db = require("../config/db")

exports.voteIdea = async (req,res)=>{

try{

const {ideaId} = req.params
const {userId} = req.body

// check if user already voted
const existingVote = await db.query(
"SELECT * FROM votes WHERE idea_id=$1 AND user_id=$2",
[ideaId,userId]
)

if(existingVote.rows.length > 0){
return res.status(400).json({
message:"You already voted for this idea"
})
}

// insert vote
await db.query(
"INSERT INTO votes (idea_id,user_id) VALUES ($1,$2)",
[ideaId,userId]
)

// increase vote count
await db.query(
"UPDATE ideas SET votes = votes + 1 WHERE id=$1",
[ideaId]
)

res.json({message:"Vote added"})

}catch(err){

console.error(err)
res.status(500).json({error:"Server error"})

}

}
