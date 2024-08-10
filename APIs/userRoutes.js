// const userValidation = require("../middlewares/validation/userValidation");
const userRegister = require("../services/user/register");
// const userLoginValidation = require("../middlewares/validation/userLoginValidation");
const login = require("../services/user/login");
const userValidation = require("../middlewares/validation/userValidation");
const userLoginValidation = require("../middlewares/validation/userLoginValidation");

const router = require("express").Router();
//register
router.post("/register", userValidation, userRegister);
//login
router.post("/login", userLoginValidation, login);
module.exports = router;
