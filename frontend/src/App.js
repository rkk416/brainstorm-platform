import { useEffect, useState } from "react"
import api from "./api/api"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import SessionPage from "./pages/SessionPage"
import ProfilePage from "./pages/ProfilePage"
import Navbar from "./components/Navbar"
import "./styles/style.css"

function App(){

const [user,setUser] = useState(null)
const [session,setSession] = useState(null)
const [page,setPage] = useState("dashboard")   // ✅ NEW

useEffect(()=>{
const restoreSession = async ()=>{
const token = localStorage.getItem("token")

if(!token){
return
}

try{
// Restore the logged-in user from the saved JWT after a browser refresh.
const res = await api.get("/users/me")
setUser(res.data)
}catch(err){
// Drop invalid or expired tokens so the login page is shown cleanly.
localStorage.removeItem("token")
}
}

restoreSession()
},[])

useEffect(()=>{
const handleAuthLogout = ()=>{
setUser(null)
setSession(null)
setPage("dashboard")
}

// Keep in-memory auth state aligned when an API request rejects an expired token.
window.addEventListener("auth:logout",handleAuthLogout)

return ()=> window.removeEventListener("auth:logout",handleAuthLogout)
},[])

const logout = ()=>{
// Clear the persisted JWT when the user explicitly logs out.
localStorage.removeItem("token")
setUser(null)
setSession(null)
setPage("dashboard")   // reset
}

return(

<div>

{/* NAVBAR */}
{user && (
<Navbar user={user} onLogout={logout} setPage={setPage} />
)}

{/* LOGIN */}
{!user && <LoginPage setUser={setUser}/>}

{/* DASHBOARD */}
{user && page==="dashboard" && !session && (
<DashboardPage setSession={setSession} user={user}/>
)}

{/* PROFILE */}
{user && page==="profile" && (
<ProfilePage user={user}/>
)}

{/* SESSION PAGE */}
{user && session && (
<SessionPage
session={session}
setSession={setSession}
user={user}
/>
)}

</div>

)

}

export default App
