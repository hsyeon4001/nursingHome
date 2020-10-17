const express = require("express");
// const { Post, User } = require("../models");
const jwtController = require("../controller/jwtController");
const indexController = require("../controller/indexController");
const accessController = require("../controller/accessController");

const routesVariables = require("./routesVariables").routesVariables;

const router = express.Router();

router.all(routesVariables.common.path, jwtController.verify);
router.get(routesVariables.main.path, indexController.renderPage);
router.get(routesVariables.gallery.path, indexController.readPost, indexController.renderPage);
router.get(routesVariables.notice.path, indexController.readPost, indexController.renderPage);
router.get(routesVariables.join.path, indexController.renderPage);
router.get(routesVariables.introduction.path, indexController.renderPage);
router.get(routesVariables.way.path, indexController.renderPage);
router.get(routesVariables.admit.path, indexController.renderPage);
router.get(routesVariables.space.path, indexController.renderPage);
router.get(routesVariables.agency.path, indexController.renderPage);
router.get(routesVariables.galleryPostView.path, indexController.readPostView, indexController.renderPage);
router.get(routesVariables.noticePostView.path, indexController.readPostView, indexController.renderPage);
router.get(routesVariables.post.path, accessController.chkStaff, indexController.renderPage);
router.get(routesVariables.admin.path, accessController.chkAdmin, indexController.renderPage);


module.exports = router;
