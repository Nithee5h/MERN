const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config()

const app = express();

app.get("/", (req, res) => {
    res.json("hello world");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
})