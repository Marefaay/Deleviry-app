const userModel = require("../../Database/modules/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRegister = async (request, response) => {
  try {
    const { userName, email, password } = request.body;
    const isUserExist = await userModel.findOne({ email });
    console.log(isUserExist);
    if (isUserExist) {
      /// email already exist
      return response.json({
        status: "Error",
        message: "Oops! Email Already Exist Please try Another Email",
      });
    } else {
      ///email is not exist
      ///hashing password
      bcrypt.hash(password, 4, async (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          ///add user
          userModel.insertMany({
            userName,
            email,
            password: hash,
          });
          //find new  user
          const newUser = await userModel.findOne(
            { email },
            { _id: 0, isAdmin: 0, __v: 0, createdAt: 0, updatedAt: 0 }
          );
          ///create Token
          const token = jwt.sign(
            {
              _id: newUser._id,
              username: newUser.userName,
              email: newUser.email,
            },
            process.env.SECRET_KEY
          );
            console.log(newUser);
          return response.json({
            status: "Success",
            message: `Hello ${userName} Welcome To In Our App `,
            newUser,
            token,
          });
        }
      });
    }
  } catch (err) {
    return response.json({
      status: "Error",
      message: "Error Occur When Regstration",
    });
  }
};
module.exports = userRegister;
