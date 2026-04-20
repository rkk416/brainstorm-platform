import api from "../api/api"

function VoteButton({ ideaId, user, onVote }){

const voteIdea = async ()=>{

try{

await api.post(`/votes/${ideaId}`,{
userId:user.id
})

// update UI immediately
if(onVote){
onVote(ideaId)
}

}catch(err){

alert("You already voted for this idea")

}

}

return(

<button
className="voteButton"
onClick={voteIdea}
>

⬆ Vote

</button>

)

}

export default VoteButton