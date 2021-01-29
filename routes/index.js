var express = require('express')
var router = express.Router()

var login_controller_1 = require("../ws/login/login");
var loginCtrl = new login_controller_1.loginController();

var user_controller_1 = require("../ws/user/user");
var userCtrl = new user_controller_1.userController();

var role_controller_1 = require("../ws/role/role");
var roleCtrl = new role_controller_1.roleController();

var permission_controller_1 = require("../ws/permission/permission");
var permissionCtrl = new permission_controller_1.permissionController();

var token_service_1 = require("../utils/services/token.service");
var tokenService = new token_service_1.Token();

//login controller
router.post(
    "/login",
    loginCtrl.login
);
router.post(
    "/signup",
    loginCtrl.signup
);

//user controller
router.post(
    "/users/:id/roles",
    tokenService.verifyToken,
    userCtrl.setRole
);
router.get(
    "/users/:id/roles",
    tokenService.verifyToken,
    userCtrl.getRole
);

router.post(
    "/users/:id/permissions",
    tokenService.verifyToken,
    userCtrl.setPermission
);
router.get(
    "/users/:id/permissions",
    tokenService.verifyToken,
    userCtrl.getPermission
);



// router role controller
router.post(
    "/roles",
    tokenService.verifyToken,
    roleCtrl.setRole
);
router.get(
    "/roles",
    tokenService.verifyToken,
    roleCtrl.roles
);

// router permission controller
router.post(
    "/permissions",
    tokenService.verifyToken,
    permissionCtrl.addPermission
);
router.get(
    "/permissions",
    tokenService.verifyToken,
    permissionCtrl.getPermissions
);

module.exports = router
