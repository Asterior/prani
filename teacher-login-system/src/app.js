const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const classRoutes = require("./routes/classRoutes");
const resultRoutes = require("./routes/resultRoutes");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({ secret: "secret-key", resave: false, saveUninitialized: true }));

app.use("/auth", authRoutes);
app.use("/class", classRoutes);
app.use("/results", resultRoutes);

// Define a route for the root URL
app.get("/", (req, res) => {
    res.send("Welcome to the Teacher Login System");
});

app.listen(3000, () => console.log("Server running on port 3000"));