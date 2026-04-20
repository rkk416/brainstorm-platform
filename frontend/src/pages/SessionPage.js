import { useState } from "react"
import IdeaForm from "../components/IdeaForm"
import IdeaList from "../components/IdeaList"
import api from "../api/api"

function SessionPage({ session, setSession, user }) {

const [ideas,setIdeas] = useState([])

const totalIdeas = ideas.length
const categories = [...new Set(ideas.map(i => i.category))]
const totalVotes = ideas.reduce((sum,i)=>sum + i.votes,0)

const downloadReport = async ()=>{

try{

const res = await api.get(`/sessions/${session.id}/report`,{
responseType:"blob"
})

const url = window.URL.createObjectURL(new Blob([res.data]))

const link = document.createElement("a")

link.href = url
link.setAttribute("download","brainstorm-report.txt")

document.body.appendChild(link)

link.click()

}catch(err){

console.error(err)

}

}

return(

<div className="sessionPage">

<button
className="backButton"
onClick={()=>setSession(null)}
>
← Back to Sessions
</button>

<h1 className="sessionTitle">
{session.title}
</h1>

<hr/>

{/* STAT CHIPS */}

<div className="statChips">

<div className="chip">
💡 {totalIdeas} Ideas
</div>

<div className="chip">
📂 {categories.length} Categories
</div>

<div className="chip">
🔥 {totalVotes} Votes
</div>

</div>

<button
onClick={downloadReport}
className="downloadButton"
>
Download Brainstorm Report
</button>

<hr/>

{/* IDEA FORM */}

<IdeaForm
sessionId={session.id}
user={user}
/>

{/* IDEA LIST */}

<IdeaList
sessionId={session.id}
user={user}
setIdeas={setIdeas}
/>

{/* FLOATING ADD BUTTON */}

<button
className="fab"
onClick={()=>{
const input = document.getElementById("ideaInput")
if(input){
input.focus()
}
}}
>
+
</button>

</div>

)

}

export default SessionPage