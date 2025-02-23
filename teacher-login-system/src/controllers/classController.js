const ClassModel = require("../models/classModel");
const ResultModel = require("../models/resultModel");

exports.selectClass = (req, res) => {
    // Render the select class view
    res.render("selectClass");
};

exports.getClassResults = async (req, res) => {
    const classId = req.params.classId;

    try {
        const students = await ResultModel.getStudentsByClass(classId);
        const classData = await ClassModel.getClassById(classId);

        const overallAverage = calculateOverallAverage(students);
        const passPercentage = calculatePassPercentage(students);

        res.render("classResults", {
            class: classData,
            students: students,
            overallAverage: overallAverage,
            passPercentage: passPercentage
        });
    } catch (error) {
        console.error("Error retrieving class results:", error);
        res.status(500).send("Internal Server Error");
    }
};

const calculateOverallAverage = (students) => {
    let totalScores = 0;
    let totalStudents = students.length;

    students.forEach(student => {
        totalScores += student.averageScore; // Assuming averageScore is a property in student
    });

    return totalStudents > 0 ? (totalScores / totalStudents).toFixed(2) : 0;
};

const calculatePassPercentage = (students) => {
    let passCount = students.filter(student => student.passed).length; // Assuming passed is a boolean property
    return totalStudents > 0 ? ((passCount / students.length) * 100).toFixed(2) : 0;
};