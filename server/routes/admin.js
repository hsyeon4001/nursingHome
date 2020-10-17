const express = require("express");
const { Post, User } = require("../models");
const jwtController = require("../controller/jwtController");
const accessController = require("../controller/accessController");
const indexController = require("../controller/indexController");
const adminController = require("../controller/adminController");
const routesVariables = require("./routesVariables").routesVariables;

const router = express.Router();

router.all(routesVariables.common.path, jwtController.verify);
router.get(routesVariables.userAdmin.path, accessController.chkAdmin, adminController.readUserAdmin, indexController.renderPage);
router.put(routesVariables.updateUserAdmin.path, accessController.chkAdmin, adminController.updateUserAdmin)
router.delete(routesVariables.deleteUserAdmin.path, accessController.chkAdmin, adminController.deleteUserAdmin)
router.get(routesVariables.postAdmin.path, accessController.chkAdmin, adminController.readPostAdmin, indexController.renderPage);
router.delete(routesVariables.deletePostAdmin.path, accessController.chkAdmin, adminController.deletePostAdmin);

module.exports = router;