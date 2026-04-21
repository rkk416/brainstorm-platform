import { useEffect, useState } from "react"
import api from "../api/api"

function DashboardPage({ setSession, user }) {

const [sessions,setSessions] = useState([])
const [title,setTitle] = useState("")
const [description,setDescription] = useState("")

const loadSessions = async ()=>{
const res = await api.get("/sessions")
setSessions(res.data)
}

useEffect(()=>{
loadSessions()
},[])

const createSession = async () => {
  try {

    if (!title.trim()) return

    await api.post("/sessions", {
      title,
      description,
      userId: user?.id || 1
    })

    setTitle("")
    setDescription("")
    await loadSessions()

  } catch (err) {
    console.error("CREATE SESSION ERROR:", err.response?.data || err.message)
  }
}

return(

<div className="dashboardWrapper">

<div className="dashboard">

{/* MAIN CONTENT */}
<div className="mainContent">

<div className="topBar">
<h1 className="pageTitle">Dashboard</h1>
</div>

{/* CREATE SESSION */}
<div className="createBox">

<input
placeholder="Session title..."
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<input
placeholder="Session description..."
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<button className="primaryBtn" onClick={createSession}>
+ Create Session
</button>

</div>

<h2 className="sectionTitle">Your Sessions</h2>

{/* GRID */}
<div className="sessionsGrid">

{sessions.length === 0 && (
<div className="emptyState">
✨ No sessions yet
<p>Create your first session to get started</p>
</div>
)}

{sessions.map(session=>(
<div
key={session.id}
className="sessionCard"
onClick={()=>setSession(session)}
>

<h3>{session.title}</h3>

<p className="sessionDesc">
{session.description || "No description provided"}
</p>

<div className="cardMeta">
<span>🧠 Brainstorm</span>
<span>→ Open</span>
</div>

</div>
))}

</div>

</div>

</div>

</div>

)

}

export default DashboardPage
