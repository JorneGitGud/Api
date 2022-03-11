const router = require("express").Router();
userController = require("./usersControllers/userController")

router.use("/users", userController)

module.exports = router;
