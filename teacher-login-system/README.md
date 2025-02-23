# Teacher Login System

This project implements a prototype for a teacher's login system that allows teachers to select a class and view the results of all students in that class. The system displays student performance across all subjects, overall averages, and the class pass percentage. The application is styled using Tailwind CSS for a modern and responsive design.

## Project Structure

```
teacher-login-system
├── src
│   ├── app.js                     # Entry point of the application
│   ├── controllers
│   │   ├── authController.js      # Handles teacher authentication
│   │   ├── classController.js      # Manages class-related operations
│   │   └── resultController.js     # Calculates and displays student results
│   ├── models
│   │   ├── classModel.js          # Manages class data
│   │   ├── resultModel.js         # Manages student results
│   │   └── teacherModel.js        # Manages teacher data
│   ├── public
│   │   ├── css
│   │   │   └── tailwind.css       # Tailwind CSS styles
│   │   └── js
│   │       └── main.js            # Client-side JavaScript
│   ├── routes
│   │   ├── authRoutes.js          # Routes for authentication
│   │   ├── classRoutes.js         # Routes for class selection
│   │   └── resultRoutes.js        # Routes for displaying results
│   └── views
│       ├── classResults.ejs       # Template for class results
│       ├── login.ejs              # Template for login page
│       └── selectClass.ejs        # Template for selecting a class
├── package.json                   # npm configuration file
├── tailwind.config.js             # Tailwind CSS configuration
└── README.md                      # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd teacher-login-system
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   node src/app.js
   ```

4. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`.

## Usage Guidelines

- Teachers can log in using their credentials.
- After logging in, teachers can select a class to view the results of all students.
- The results page displays individual student performance, overall averages, and the class pass percentage.

## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript)
- Tailwind CSS
- Body-parser
- Express-session

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.