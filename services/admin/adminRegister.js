const adminModel = require("../../modules/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminRegister = async (request, response) => {
  try {
    const { userName, password, email } = request.body;
    ///find admin
    const admin = await adminModel.findOne({ email });
    ///admin is exist
    if (admin) {
      return response.json({
        status: "Error",
        messsage: "Oops!,This Admin Is Already Exist",
      });
    }
    ///admin not exist
    ///hashing password
    bcrypt.hash(password, 4, async (err, hash) => {
      //error
      if (err) {
        console.error(err);
      }
      //store admin
      await adminModel.insertMany({
        userName: userName,
        email,
        password: hash,
      });

      //find new admin
      const newAdmin = await adminModel.findOne(
        { email },
        { _id: 0, __v: 0, isAdmin: 0, createdAt: 0, updatedAt: 0, password: 0 }
      );
      console.log(newAdmin);
      const token = jwt.sign(
        {
          _id: newAdmin._id,
          username: newAdmin.userName,
          email: newAdmin.email,
        },
        process.env.SECRET_KEY
      );
      ///response
      return response.json({
        status: "Success",
        message: `Hello ${newAdmin.userName}`,
        newAdmin,
        token,
      });
    });
  } catch (err) {
    return response.json({
      status: "Error",
      message: "Oops!, Error Occur When Regstration",
      error: err.message,
    });
  }
};
module.exports = adminRegister;
