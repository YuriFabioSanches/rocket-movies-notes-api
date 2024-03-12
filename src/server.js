require("express-async-errors");
const AppError = require("./utils/AppError")
const sqlConnection = require("./database/sqlite")
const routes = require("./routes");
const express = require("express");
const app = express();

sqlConnection();

app.use(express.json());
app.use(routes);

app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
      statusCode: error.statusCode
    })
  };

  console.error(error)

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
    statusCode: 500
  });
});

const PORT = 3333;
app.listen(PORT, () => {console.log(`Server running at port: ${PORT}`)});