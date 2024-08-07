const Joi = require("joi");
const joi = require("joi");
///joi Schema
const schema = joi.object({
  userName: Joi.string().min(5).max(30).required().trim(),
  email: Joi.string()
    .required()
    .pattern(/^\w+@gmail.com$/),
  password: Joi.string()
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
});

const userValidation = async (request, response, next) => {
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
module.exports = userValidation;
