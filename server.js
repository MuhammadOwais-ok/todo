const express = require("express")
const app = express()
require('dotenv').config();
const PORT = process.env.PORT || 2498
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectDB = require("./db/connect")


app.use("/auth", require("./routes/auth.routes"))
app.use("/todo", require("./routes/todo.routes"))
app.use("/user", require("./routes/user.routes"))
app.use("/admin",require("./routes/admin.routes"))













connectDB()


app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`);


})