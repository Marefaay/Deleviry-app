// const userModel = require("../../Database/modules/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../../modules/userModel");

const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    ///find user by email
    const user = await userModel.findOne({ email });
    console.log(user);
    //user not found
    if (!user) {
      return response.json({
        status: "Error",
        message: "Oops! This Email Is Not Exist",
      });
    }
    //user is found
    //compare entered pass with stored pass
    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        console.error(err);
      }
      console.log(result);
      //pass matched
      if (result == true) {
        ///generte token
        let token = jwt.sign(
          {
            userId: user._id,
            username: user.userName,
            email: user.email,
            isAdmin: user.isAdmin,
          },
          process.env.SECRET_KEY
        );
        const newUser = await userModel.findOne(
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

        ///response
        return response.json({
          status: "Success",
          message: `hello ${user.userName} Welcome Back`,
          token,
          newUser,
        });
      } else {
        return response.json({
          status: "Error",
          message: "Oops! ,Password Incorrect",
        });
      }
    });
  } catch (err) {
    return response.json({
      status: "Error",
      message: "Oops!, Error Occurred When Login",
      error: err.message,
    });
  }
};
module.exports = login;
