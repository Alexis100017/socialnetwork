const express = require("express");
const connectDB = require("./config/Db");
const app = express();

//connect db
connectDB();

//init middleware, which will help to get data in the request body
app.use(express.json({ extended: false }));

//endpoint definitions
app.get("/", (req, res) => res.send("API running"));
app.use("/api/users", require("./routes/api/Users"));
app.use("/api/auth", require("./routes/api/Auth"));
app.use("/api/profile", require("./routes/api/Profile"));
app.use("/api/posts", require("./routes/api/Posts"));

//if there is a env variable called port the app will listen for that
//port, else it will use 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started in", PORT));
