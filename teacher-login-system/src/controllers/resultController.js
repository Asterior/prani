// filepath: /teacher-login-system/teacher-login-system/src/controllers/resultController.js
const ResultModel = require('../models/resultModel');
const ClassModel = require('../models/classModel');

const getResults = (req, res) => {
    // Logic to get all results
    res.send("All results");
};

const getClassResults = async (req, res) => {
    try {
        const classId = req.params.classId;
        const results = await ResultModel.getResultsByClass(classId);
        const classData = await ClassModel.getClassById(classId);

        if (!results || results.length === 0) {
            return res.status(404).send('No results found for this class.');
        }

        const totalStudents = results.length;
        const passCount = results.filter(result => result.score >= 50).length;
        const passPercentage = (passCount / totalStudents) * 100;

        const overallAverage = results.reduce((acc, result) => acc + result.score, 0) / totalStudents;

        res.render('classResults', {
            class: classData,
            results: results,
            overallAverage: overallAverage.toFixed(2),
            passPercentage: passPercentage.toFixed(2)
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving class results.');
    }
};

module.exports = {
    getResults,
    getClassResults
};