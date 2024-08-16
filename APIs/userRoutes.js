// const userValidation = require("../middlewares/validation/userValidation");
const userRegister = require("../services/user/register");
// const userLoginValidation = require("../middlewares/validation/userLoginValidation");
const login = require("../services/user/login");
const userValidation = require("../middlewares/validation/userValidation");
const userLoginValidation = require("../middlewares/validation/userLoginValidation");
const userAutherization = require("../middlewares/autherization/userAutherization");
const editName = require("../services/user/editName");
const editUserNameValidation = require("../middlewares/validation/editUserNameValidation");

const router = require("express").Router();
//register
router.post("/register", userValidation, userRegister);
//login
router.post("/login", userLoginValidation, login);
//editName
router.put(
  "/profile/edit-name",
  userAutherization,
  editUserNameValidation,
  editName
);
module.exports = router;
