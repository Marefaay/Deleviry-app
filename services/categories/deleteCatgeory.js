const categoryModel = require("../../modules/categoryModel");

const deleteCategory = async (request, response) => {
  try {
    const { categoryId } = request.body;
    //find Categories
    const category = await categoryModel.findOne({ categoryId });
    //category Not Found
    if (!category) {
      return response.json({
        status: "Error",
        message: "Oops!, There Is No Category With THiS Id",
      });
    }
    //category Is Found
    await categoryModel.deleteOne({ categoryId });
    return response.json({
      status: "Success",
      message: `Congratulations, Category with id ${categoryId} Deleted Succefully`,
    });
  } catch (err) {
    return response.json({
      status: "Error",
      message: "Oops!, Error Occurred When Try To Delete Category",
      error: err,
    });
  }
};
module.exports = deleteCategory;
