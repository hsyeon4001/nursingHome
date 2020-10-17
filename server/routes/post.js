const express = require("express");
const jwtController = require("../controller/jwtController");
const accessController = require("../controller/accessController");
const indexController = require("../controller/indexController");
const postController = require("../controller/postController");
const routesVariables = require("../routes/routesVariables").routesVariables;

const router = express.Router();

router.all(routesVariables.common.path, jwtController.verify);
router.post(routesVariables.createPost.path, accessController.chkStaff, postController.upload.single("url"), postController.createPost);
router.get(routesVariables.readPostEdit.path, accessController.chkAuthor, postController.readPostEdit, indexController.renderPage);
router.put(routesVariables.updatePost.path, accessController.chkAuthor, postController.upload.single("url"), postController.updatePost);
router.delete(routesVariables.deletePost.path, accessController.chkAuthor, postController.deletePost);


module.exports = router;
