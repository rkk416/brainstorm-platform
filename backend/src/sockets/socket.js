module.exports = (io)=>{

io.on("connection",(socket)=>{

console.log("User connected")

socket.on("newIdea",(idea)=>{

io.emit("ideaCreated",idea)

})

})

}