const jwt = require("jsonwebtoken");
const userAutherization = async (request, response, next) => {
  try {
    let token = request.header("token");
    //no token
    if (!token) {
      return response.json({
        status: "Error",
        message: "Oops! ,No Token Provided",
      });
    }
    ///there is a token
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      ///error
      if (err) {
        return response.json({ status: "Error", message: err });
      }
      ///is admin
      if (decoded.isAdmin == true) {
        return response.json({
          status: "Error",
          message: "Oops!, You Can Not Enter Here",
        });
      }
      //is user
      request.id = decoded.userId;
      next();
    });
  } catch (err) {
    return response.json({ status: "Error", message: err });
  }
};
module.exports = userAutherization;
