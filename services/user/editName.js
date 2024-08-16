const userModel = require("../../modules/userModel");

const editName = async (request, response) => {
  try {
    const { userName } = request.body;
    const user = await userModel.findOne({ _id: request.id });
    console.log(user);
    //user not found
    if (!user) {
      return response.json({
        status: "Error",
        message: "Oops!,This User Is Not Found",
      });
    }
    ///user Found
    await userModel.updateOne({ _id: request.id }, { userName });
    console.log(user);
    return response.json({
      status: "Success",
      message: `Congrtulations Your Name Updated To  ${userName} Succefully`,
    });
  } catch (err) {
    return response.json({
      status: "Error",
      message: "Oops!, Error Occurred When Edit Name",
      error: err.message,
    });
  }
};
module.exports = editName;
