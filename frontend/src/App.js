import { useState } from "react"
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

const logout = ()=>{
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