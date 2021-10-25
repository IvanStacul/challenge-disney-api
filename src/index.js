// require modules
const express = require("express");

const apiRouter = require("./routes/apiRouter");

// config server
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// requiere db
require("./database/config/db");

// urls
app.use("/api/v1", apiRouter);

// start server
app.listen(port, () => {
    console.log(`Disney app listening at http://localhost:${port}`);
});
