const adminAuherization = require("../middlewares/autherization/adminAutherization");
const addCategoryValidation = require("../middlewares/validation/addCategoryValidation");
const deleteCategoryValidation = require("../middlewares/validation/deleteCategoryvalidation");
const addCategory = require("../services/categories/addCategory");
const deleteCategory = require("../services/categories/deleteCatgeory");
const viewAllCatgeory = require("../services/categories/viewAllCatgeories");
const viewOneCategory = require("../services/categories/viewOneCategory");

const router = require("express").Router();
//add actegory
router.post(
  "/add-category",
  adminAuherization,
  addCategoryValidation,
  addCategory
);
//view One Category
router.get(
  "/view-one-category",
  adminAuherization,
  addCategoryValidation,
  viewOneCategory
);
//view All Categories
router.get("/view-all-categories", adminAuherization, viewAllCatgeory);
//delete One category
router.delete(
  "/delete-one-category",
  adminAuherization,
  deleteCategoryValidation,
  deleteCategory
);
module.exports = router;
