const Joi = require("joi");

const schema = Joi.object({
  categoryId: Joi.number().required(),
});

const deleteCategoryValidation = async (request, response, next) => {
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
module.exports = deleteCategoryValidation;
