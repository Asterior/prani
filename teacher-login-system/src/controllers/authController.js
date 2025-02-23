const Teacher = require("../models/teacherModel");
const session = require("express-session");

exports.login = (req, res) => {
    const { username, password } = req.body;
    Teacher.findByCredentials(username, password)
        .then(teacher => {
            if (teacher) {
                req.session.teacherId = teacher.id;
                res.redirect("/select-class");
            } else {
                res.status(401).send("Invalid credentials");
            }
        })
        .catch(err => {
            res.status(500).send("Server error");
        });
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Could not log out");
        }
        res.redirect("/login");
    });
};

exports.isAuthenticated = (req, res, next) => {
    if (req.session.teacherId) {
        return next();
    }
    res.redirect("/login");
};