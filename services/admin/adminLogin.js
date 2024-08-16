const adminModel = require("../../modules/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminLogin = async (request, response) => {
  try {
    const { email, password } = request.body;
    //find admin
    const adminIsExist = await adminModel.findOne({ email });
    //email not exist
    if (!adminIsExist) {
      return response.json({
        status: "Success",
        message: "Oops! This Email Is Not Exist, Please Try Another One",
      });
    }
    ///email is exist
    //match password
    bcrypt.compare(password, adminIsExist.password, async (err, result) => {
      ///error
      if (err) {
        console.error(err);
      }
      if (result == true) {
        //create token
        let token = jwt.sign(
          {
            adminId: adminIsExist._id,
            userName: adminIsExist.userName,
            email: adminIsExist.email,
            isAdmin: adminIsExist.isAdmin,
          },
          process.env.SECRET_KEY
        );
        const admin = await adminModel.findOne(
          { email },
          {
            _id: 0,
            __v: 0,
            isAdmin: 0,
            createdAt: 0,
            updatedAt: 0,
            password: 0,
          }
        );
        return response.json({
          status: "Success",
          message: `Hello ${admin.userName} welcome in our application`,
          token,
          admin,
        });
      } else {
        return response.json({
          status: "Error",
          message: "Oops! ,Password Incorrect",
        });
      }
      // result == true
    });
  } catch (err) {
    return response.json({
      status: "Error",
      message: "ُOops! Error Occured When Login",
      error: err.message,
    });
  }
};
module.exports = adminLogin;
