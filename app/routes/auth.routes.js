const express = require('express');
const { authMiddleware } = require("../middlewares")
const { authController } = require("../controller");

const router = express.Router();
router.post("/signUp", [authMiddleware.checkDuplicateUsernameOrEmail, authMiddleware.checkRolesExisted], authController.signUp);
router.post("/signIn", authController.signIn);
module.exports = router;