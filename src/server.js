const routes = require("./routes")
const express = require("express");
const app = express();

app.use(express.json())
app.use(routes)






const PORT = 3333;
app.listen(PORT, () => {console.log(`Server running at port: ${PORT}`)});