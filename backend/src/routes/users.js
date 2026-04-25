const router = require("express").Router()
const userController = require("../controllers/userController")

router.post("/register", userController.registerUser)
router.post("/login", userController.loginUser)
// Rehydrates the current user from the JWT stored by the frontend.
router.get("/me", userController.getCurrentUser)

module.exports = router
