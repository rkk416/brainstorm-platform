import { useState, useRef, useEffect } from "react"

function Navbar({ user, onLogout, setPage }) {

const [open,setOpen] = useState(false)
const dropdownRef = useRef()

// close when clicking outside
useEffect(()=>{
const handleClickOutside = (e)=>{
if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
setOpen(false)
}
}

document.addEventListener("mousedown",handleClickOutside)

return ()=>{
document.removeEventListener("mousedown",handleClickOutside)
}
},[])

return(

<div className="navbar">

<div 
className="logo"
onClick={()=>{
setPage("dashboard")
setOpen(false)
}}
style={{cursor:"pointer"}}
>
🧠 Brainstorm
</div>

<div className="navRight">

<div className="avatarBox" ref={dropdownRef}>

<div 
className="avatar" 
onClick={()=>setOpen(prev=>!prev)}
>
{user?.name?.charAt(0)?.toUpperCase()}
</div>

<div className={`dropdown ${open ? "show" : ""}`}>

{/* USER HEADER */}
<div className="dropdownHeader">
👤 {user?.name}
</div>

{/* ACTIONS */}
<div 
className="dropdownItem"
onClick={()=>{
setPage("dashboard")
setOpen(false)
}}
>
🏠 Dashboard
</div>

<div 
className="dropdownItem"
onClick={()=>{
setPage("profile")
setOpen(false)
}}
>
👤 Profile
</div>

<div 
className="dropdownItem logout"
onClick={onLogout}
>
🚪 Logout
</div>

</div>

</div>

</div>

</div>

)

}

export default Navbar