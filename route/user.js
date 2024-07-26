const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const userAuthentication = require("../middlewares/userAuthentication");


router.post('/v1/api/user/signUp',userController.signUp)
router.post('/v1/api/user/logIn',userController.logIn)

router.get('/v1/api/user/profile',userAuthentication,userController.users)

module.exports = router;