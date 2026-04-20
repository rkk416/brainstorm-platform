import { useEffect, useState } from "react"
import api from "../api/api"
import VoteButton from "./VoteButton"
import { io } from "socket.io-client"

const socket = io("http://localhost:5000")

function IdeaList({ sessionId, user }) {

const [ideas,setIdeas] = useState([])
const [search,setSearch] = useState("")
const [categoryFilter,setCategoryFilter] = useState("All")

useEffect(()=>{

loadIdeas()

const handler = (idea)=>{

setIdeas(prev => {

const exists = prev.find(i => i.id === idea.id)

if(exists){
return prev
}

return [idea,...prev]

})

}

socket.on("ideaCreated",handler)

return ()=> socket.off("ideaCreated",handler)

// eslint-disable-next-line react-hooks/exhaustive-deps
},[sessionId])

const loadIdeas = async()=>{

const res = await api.get(`/ideas/${sessionId}`)

setIdeas(res.data)

}

// DELETE IDEA FUNCTION
const deleteIdea = async (ideaId)=>{

try{

await api.delete(`/ideas/${ideaId}`,{
data:{userId:user.id}
})

setIdeas(prev => prev.filter(i => i.id !== ideaId))

}catch(err){

console.error(err)
alert("Only admin can delete ideas")

}

}

// SEARCH FILTER
const filteredIdeas = ideas.filter(idea =>
idea.content.toLowerCase().includes(search.toLowerCase())
)

// CATEGORY FILTER
const visibleIdeas = categoryFilter === "All"
? filteredIdeas
: filteredIdeas.filter(idea => idea.category === categoryFilter)

// GROUP IDEAS
const groupedIdeas = visibleIdeas.reduce((groups,idea)=>{

if(!groups[idea.category]){
groups[idea.category] = []
}

groups[idea.category].push(idea)

return groups

},{})

// UNIQUE CATEGORIES
const categories = [...new Set(ideas.map(idea => idea.category))]

// CATEGORY COLOR HELPER
function getCategoryColor(category){

const colors={
AI:"#6366F1",
Marketing:"#10B981",
Product:"#F59E0B",
Design:"#3B82F6"
}

return colors[category] || "#64748B"

}

return(

<div>

{/* SEARCH */}

<input
placeholder="🔍 Search ideas..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{padding:"8px",marginBottom:"10px",width:"100%"}}
/>

{/* CATEGORY FILTER */}

<select
value={categoryFilter}
onChange={(e)=>setCategoryFilter(e.target.value)}
style={{marginBottom:"20px"}}
>

<option value="All">All Categories</option>

{categories.map(cat =>(
<option key={cat} value={cat}>
{cat}
</option>
))}

</select>

{/* LEADERBOARD */}

<div className="leaderboard">

<h2>🏆 Top Ideas</h2>

{ideas
.slice()
.sort((a,b)=>b.votes - a.votes)
.slice(0,3)
.map((idea,index)=>(

<div key={idea.id}>
{index+1}. {idea.content} ({idea.votes} votes)
</div>

))}

</div>

<hr/>

{/* IDEAS BY CATEGORY */}

{Object.keys(groupedIdeas).map(category => (

<div key={category}>

<h2 style={{marginTop:"20px"}}>
{category.toUpperCase()} IDEAS ({groupedIdeas[category].length})
</h2>

{groupedIdeas[category].map(idea =>(

<div className="ideaCard" key={idea.id}>

<div className="ideaHeader">

<h3>{idea.content}</h3>

<span
className="categoryTag"
style={{
background:getCategoryColor(idea.category)
}}
>
{idea.category}
</span>

</div>

<p className="ideaAuthor">
Added by {idea.author}
</p>

<div className="ideaFooter">

  <div className="voteGroup">
    <div className="voteBadge">
      ⬆ {idea.votes}
    </div>

    {/* ALWAYS show vote */}
    <VoteButton
      ideaId={idea.id}
      user={user}
      onVote={(id)=>{
        setIdeas(prev =>
          prev.map(i =>
            i.id === id ? {...i, votes: i.votes + 1} : i
          )
        )
      }}
    />
  </div>

  {/* ONLY admin sees delete */}
  {user?.role === "admin" && (
    <button
      className="deleteBtn"
      onClick={()=>deleteIdea(idea.id)}
    >
      Delete
    </button>
  )}

</div>

</div>

))}

</div>

))}

</div>

)

}

export default IdeaList