const router = require("express").Router()

const sessionController = require("../controllers/sessionController")

router.post("/",sessionController.createSession)

router.get("/",sessionController.getSessions)

module.exports = router