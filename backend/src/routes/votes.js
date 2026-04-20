const router = require("express").Router()
const { voteIdea } = require("../controllers/voteController")

router.post("/:ideaId", voteIdea)

module.exports = router 