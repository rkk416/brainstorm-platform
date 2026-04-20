const sessionModel = require("../models/sessionModel")

exports.createSession = async (req,res)=>{

const {title,description} = req.body

try{

const session = await sessionModel.createSession(title,description)

res.json(session)

}catch(err){

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