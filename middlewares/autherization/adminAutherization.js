const jwt = require("jsonwebtoken");
const adminAuherization = async (request, response, next) => {
  try {
    let token = request.header("token");
    //Token Bot Found
    if (!token) {
      return response.json({
        status: "Error",
        message: "Oops! Token Is Not Found",
      });
    }
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      ///error
      if (err) {
        return response.json({ status: "Error", message: err });
      }
      ///is user
      if (decoded.isAdmin == false) {
        return response.json({
          status: "Error",
          message: "Oops!, You Can Not Enter Here",
        });
      }
      //is admin
      console.log(decoded.adminId)
      request.id = decoded.adminId;
      next();
    });
  } catch (err) {
    return response.json({ status: "Error", message: err });
  }
};
module.exports = adminAuherization;
