const userLoginValidation = require("../middlewares/validation/userLoginValidation");
const userValidation = require("../middlewares/validation/userValidation");
const adminLogin = require("../services/admin/adminLogin");
const adminRegister = require("../services/admin/adminRegister");

const router = require("express").Router();
//register
router.post("/register", userValidation, adminRegister);
//login
router.post("/login", userLoginValidation, adminLogin);
module.exports = router;
