class Teacher {
    constructor(name, username, password, classes) {
        this.name = name;
        this.username = username;
        this.password = password; // In a real application, ensure to hash passwords
        this.classes = classes; // Array of classes the teacher is associated with
    }

    // Method to validate teacher's credentials
    validateCredentials(inputUsername, inputPassword) {
        return this.username === inputUsername && this.password === inputPassword;
    }

    // Method to get the classes taught by the teacher
    getClasses() {
        return this.classes;
    }
}

// Example of teacher data (this would typically come from a database)
const teachers = [
    new Teacher("John Doe", "johndoe", "password123", ["Math", "Science"]),
    new Teacher("Jane Smith", "janesmith", "password456", ["English", "History"]),
];

module.exports = {
    Teacher,
    teachers,
};