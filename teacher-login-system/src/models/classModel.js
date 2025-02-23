// filepath: /teacher-login-system/teacher-login-system/src/models/classModel.js
class ClassModel {
    constructor(name) {
        this.name = name;
        this.students = [];
    }

    addStudent(student) {
        this.students.push(student);
    }

    getStudents() {
        return this.students;
    }

    getClassName() {
        return this.name;
    }

    calculatePassPercentage(passingScore) {
        const totalStudents = this.students.length;
        const passedStudents = this.students.filter(student => student.score >= passingScore).length;
        return totalStudents > 0 ? (passedStudents / totalStudents) * 100 : 0;
    }
}

module.exports = ClassModel;