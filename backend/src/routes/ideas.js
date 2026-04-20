const router = require("express").Router()

const {
createIdea,
getIdeas,
deleteIdea
} = require("../controllers/ideaController")

router.post("/",createIdea)

router.get("/:sessionId",getIdeas)

router.delete("/:ideaId",deleteIdea)

module.exports = router