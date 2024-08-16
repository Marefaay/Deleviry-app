const categoryModel = require("../../modules/categoryModel");

const viewAllCatgeory = async (request, response) => {
  try {
    //find Catgories
    const categories = await categoryModel
      .find({}, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 })
      .populate("addedBy", {
        _id: 0,
        password: 0,
        isAdmin: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        profilePhoto: 0,
        email: 0,
      });
    const categoriesCount = await categoryModel.countDocuments();
    //catgory Is Not Found
    if (!categories) {
      return response.json({
        status: "Error",
        message: "Oops!, There Is No Categories To retrived",
      });
    }
    //Catgory is Found
    return response.json({
      status: "Succes",
      message: "Congratulations, Categories retrived Succefully",
      categories,
      categoriesCount,
    });
  } catch (err) {
    return response.json({
      status: "Error",
      message: "Oops!, Error Occurred When Try To View All Cateories",
      error: err.message,
    });
  }
};
module.exports = viewAllCatgeory;
