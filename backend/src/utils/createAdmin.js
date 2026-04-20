const db = require("../config/db")
const bcrypt = require("bcrypt")

const createAdmin = async () => {

try{

const existing = await db.query(
"SELECT * FROM users WHERE email='admin@brainstorm.com'"
)

if(existing.rows.length === 0){

// 🔐 hash password
const hashedPassword = await bcrypt.hash("12345",10)

await db.query(
"INSERT INTO users (name,email,role,password) VALUES ($1,$2,$3,$4)",
["Ram Krishna","ramkrishn@gmail.com","admin",hashedPassword]
)

console.log("Admin created")

}

}catch(err){

console.error(err)

}

}

module.exports = createAdmin