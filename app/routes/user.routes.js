const express = require('express');
const { authJWTMiddleware } = require("../middlewares")
const { userController } = require("../controller");


const router = express.Router();

router.get("/all", userController.allAccess);
router.get("/user", [authJWTMiddleware.verifyToken], userController.userBoard);
router.get("/mod", [authJWTMiddleware.verifyToken, authJWTMiddleware.isModerator], userController.moderatorBoard);
router.get("/admin", [authJWTMiddleware.verifyToken, authJWTMiddleware.isAdmin], userController.adminBoard);

module.exports = router;

