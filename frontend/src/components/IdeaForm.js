import { useState } from "react"
import api from "../api/api"

function IdeaForm({ sessionId, user }) {

const [idea,setIdea] = useState("")
const [category,setCategory] = useState("")

const submitIdea = async ()=>{

if(!idea || !category){
return
}

try{

await api.post("/ideas",{
sessionId:sessionId,
content:idea,
category:category,
author:user.name
})

setIdea("")
setCategory("")

}catch(err){

console.error(err)

}

}

return(

<div className="ideaForm">

<input
id="ideaInput"
placeholder="Idea"
value={idea}
onChange={(e)=>setIdea(e.target.value)}
/>

<input
placeholder="Category"
value={category}
onChange={(e)=>setCategory(e.target.value)}
/>

<button
onClick={submitIdea}
className="addIdeaButton"
>
Add Idea
</button>

</div>

)

}

export default IdeaForm