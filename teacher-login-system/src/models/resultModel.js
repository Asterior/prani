// filepath: /teacher-login-system/teacher-login-system/src/models/resultModel.js
class Result {
    constructor(studentId, subjectScores) {
        this.studentId = studentId;
        this.subjectScores = subjectScores; // { subjectName: score }
    }

    getAverage() {
        const totalScores = Object.values(this.subjectScores).reduce((acc, score) => acc + score, 0);
        return totalScores / Object.keys(this.subjectScores).length;
    }

    getPassStatus(passingScore) {
        return Object.values(this.subjectScores).every(score => score >= passingScore);
    }
}

const calculateClassPassPercentage = (results, passingScore) => {
    const totalStudents = results.length;
    const passingStudents = results.filter(result => result.getPassStatus(passingScore)).length;
    return (passingStudents / totalStudents) * 100;
};

module.exports = { Result, calculateClassPassPercentage };