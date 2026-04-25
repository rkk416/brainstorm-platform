import { useState } from "react"
import api from "../api/api"

function LoginPage({ setUser }) {

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [isRegister,setIsRegister] = useState(false)
const [message,setMessage] = useState("")

const handleSubmit = async ()=>{

try{

if(isRegister){

await api.post("/users/register",{name,email,password})

setMessage("Account created! Please login.")
setIsRegister(false)
setName("")
setPassword("")

}else{

const res = await api.post("/users/login",{email,password})
// Persist the JWT so the app can restore this user after a page refresh.
localStorage.setItem("token",res.data.token)
setUser(res.data)

}

}catch(err){
setMessage(err.response?.data?.message || "Error")
}

}

return(

<div className="authPage">

{/* 🔥 TOP NAVBAR */}
<div className="authNavbar">
  <div className="logo">🧠 Brainstorm</div>
</div>

{/* LEFT SIDE */}
<div className="authLeft">

<h1 className="heroTitle">
Learn by Doing,<br/>Not Just Watching
<span className="rocket">🚀</span>
</h1>

<p className="heroSubtext">
Join collaborative brainstorming sessions, share ideas, 
get real-time feedback, and turn thoughts into action.

<br/><br/>

Stop consuming. Start building.
</p>

</div>

{/* RIGHT SIDE */}
<div className="authRight">

<div className="authCard">

<h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>

{message && <p className="authMessage">{message}</p>}

{isRegister && (
<input
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>
)}

<input
placeholder="Email address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="primaryBtn" onClick={handleSubmit}>
{isRegister ? "Create Account" : "Login"}
</button>

<p 
className="switchText" 
onClick={()=>{
setIsRegister(!isRegister)
setMessage("")
}}
>
{isRegister
? "Already have an account? Login"
: "New here? Create account"}
</p>

</div>

</div>

</div>

)

}

export default LoginPage
