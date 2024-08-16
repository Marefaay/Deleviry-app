const Joi = require("joi");

const schema = Joi.object({
    categoryTitle: Joi.string().alphanum().min(3).max(30).required(),
});

const addCategoryValidation = async (request, response, next) => {
  const errorsArray = [];
  ///validate on requestbody
  const { error } = schema.validate(request.body);
  if (!error) {
    next();
  } else {
    error.details.forEach((msg) => {
      errorsArray.push(msg.message);
    });
    return response.json({ status: "Error", message: errorsArray });
  }
};
module.exports = addCategoryValidation;
