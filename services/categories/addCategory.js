const categoryModel = require("../../modules/categoryModel");

const addCategory = async (request, response) => {
  try {
    const { categoryTitle } = request.body;
    //find category
    const title = await categoryModel.findOne({ categoryTitle });
    //catgeory is already exist
    if (title) {
      return response.json({
        status: "Error",
        message: `Oops! ,Catgeory "${categoryTitle}" Is Already Exist`,
      });
    }
    //category is nnot exist
    //find All Categpries
    const allCategories = await categoryModel.find({});
    console.log(allCategories);
    const ids = allCategories.map((catgory) => catgory.categoryId);

    let maxId = Math.max(...ids, 0);
    console.log(maxId);
    console.log(request.id);
    //add catgoery
    const category = await categoryModel.insertMany({
      categoryId: maxId + 1,
      categoryTitle,
      addedBy: request.id,
    });
    console.log(category)
    return response.json({
      status: "Success",
      message: ` Catgory ${categoryTitle} Added Succeullfy`,
    });
  } catch (err) {
    return response.json({
      status: "Error",
      message: "Oops!, Error Occured When Add Category",
      error: err.message,
    });
  }
};
module.exports = addCategory;
