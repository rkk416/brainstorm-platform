import { useEffect, useState } from "react"
import api from "../api/api"

function ProfilePage({ user }) {

const [stats,setStats] = useState({
sessions:0,
ideas:0,
votes:0
})

useEffect(()=>{
loadStats()
},[])

const loadStats = async ()=>{
try{
const sessionsRes = await api.get("/sessions")
const ideasRes = await api.get("/ideas")
const votesRes = await api.get("/votes")

setStats({
sessions:sessionsRes.data.length,
ideas:ideasRes.data.length,
votes:votesRes.data.length
})

}catch(err){
console.error(err)
}
}

return(

<div className="profilePage">

<div className="profileCard">

<div className="profileHeader">

<div className="profileAvatar">
{user?.name?.charAt(0).toUpperCase()}
</div>

<h2>{user?.name}</h2>
<p>{user?.email}</p>

</div>

<div className="profileStats">

<div className="statBox">
<h3>{stats.sessions}</h3>
<p>Sessions</p>
</div>

<div className="statBox">
<h3>{stats.ideas}</h3>
<p>Ideas</p>
</div>

<div className="statBox">
<h3>{stats.votes}</h3>
<p>Votes</p>
</div>

</div>

</div>

</div>

)

}

export default ProfilePage