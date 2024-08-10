const userValidation = require("../middlewares/validation/userValidation");
const adminRegister = require("../services/admin/adminRegister");

const router = require("express").Router();
router.post("/register", userValidation, adminRegister);
module.exports = router;
