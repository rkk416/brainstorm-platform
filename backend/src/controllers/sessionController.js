const sessionModel = require("../models/sessionModel")

exports.createSession = async (req,res)=>{

  const { title, description, userId } = req.body

  console.log("🔥 BODY:", req.body)

  try{

    const session = await sessionModel.createSession(
      title,
      description,
      userId || 1
    )

    console.log("✅ SESSION CREATED:", session)

    res.json(session)

  }catch(err){

    console.error("❌ SESSION ERROR:", err)

    res.status(500).json({error:err.message})

  }

}

exports.getSessions = async (req,res)=>{

try{

const sessions = await sessionModel.getSessions()

res.json(sessions)

}catch(err){

res.status(500).json({error:err.message})

}

}
