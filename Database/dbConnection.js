const mongoose = require("mongoose");
const dbConnection = mongoose
  .connect(process.env.DB_URL)
  .catch((err) => {
    console.error(err);
  })
  .then(() => {
    console.log(
      `Deleviry App DB Connected Succefully On Port ${process.env.PORT} `
    );
  });
module.exports = dbConnection;
