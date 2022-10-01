const connect =  require("./configs/db");
require("dotenv").config();
const app = require("./sever");
const PORT = process.env.PORT || 8888;

connect();

app.get("/", (req, res) => {
    res.send("Welcome to classroom");
});

app.listen(PORT, () => {
    console.log("CLass connected to port " + PORT);
})