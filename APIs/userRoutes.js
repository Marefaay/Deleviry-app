const { model } = require("mongoose");
const userValidation = require("../middlewares/validation/userValidation");
const userRegister = require("../services/user/register");

const router = require("express").Router();
router.post("/register", userValidation, userRegister);
module.exports = router;
