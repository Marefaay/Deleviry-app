const categoryModel = require("../../modules/categoryModel");

const viewOneCategory = async (request, response) => {
  try {
    const { categoryTitle } = request.body;
    //find Category
    const category = await categoryModel
      .findOne(
        { categoryTitle },
        { _id: 0, __v: 0, createdAt: 0, updatedBy: 0 }
      )
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

    //No Catgories
    if (!category) {
      return response.json({
        status: "Error",
        message: "Oops!, No Categories Founded To Be retrivered",
      });
    }
    ///there is  categories
    return response.json({
      status: "Success",
      message: "Congratulations Caatgeories Retrived Succefully",
      category,
    });
  } catch (err) {
    return response.json({
      status: "Error",
      message: "Oops!, Error Occured When Try To View Category",
      error: err.message,
    });
  }
};
module.exports = viewOneCategory;
