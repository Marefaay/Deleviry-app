const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();
///dbConnection
const dbConnection = require("./Database/dbConnection");
dbConnection;
app.use(express.json());
//routes
app.use("/user", require("./APIs/userRoutes"));
app.get("/", (req, res) => res.send("Hello World!"));
///listen in port
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
///not found route
app.get("*", (request, response) => {
  return response.json({ status: "Error", message: "Not Found Page" });
});
