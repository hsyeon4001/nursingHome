const express = require("express");
const jwtController = require("../controller/jwtController");
const signController = require("../controller/signController");
const routesVariables = require("../routes/routesVariables").routesVariables;

const router = express.Router();

router.all(routesVariables.common.path, jwtController.verify);
router.post(routesVariables.signIn.path, jwtController.create);
router.get(routesVariables.signOut.path, signController.signOut);
router.post(routesVariables.signUp.path, signController.createUser);
router.post(routesVariables.signDuplication.path, signController.checkDuplication);

module.exports = router;