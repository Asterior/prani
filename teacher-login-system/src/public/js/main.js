// filepath: /teacher-login-system/teacher-login-system/src/public/js/main.js
document.addEventListener("DOMContentLoaded", function() {
    const classSelectForm = document.getElementById("class-select-form");
    const resultsContainer = document.getElementById("results-container");

    if (classSelectForm) {
        classSelectForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const selectedClass = classSelectForm.class.value;

            fetch(`/results/${selectedClass}`)
                .then(response => response.json())
                .then(data => {
                    displayResults(data);
                })
                .catch(error => console.error("Error fetching results:", error));
        });
    }

    function displayResults(data) {
        resultsContainer.innerHTML = ""; // Clear previous results
        const classInfo = document.createElement("h2");
        classInfo.textContent = `Results for Class: ${data.className}`;
        resultsContainer.appendChild(classInfo);

        const resultsList = document.createElement("ul");
        data.students.forEach(student => {
            const listItem = document.createElement("li");
            listItem.textContent = `${student.name}: ${student.average} (Pass: ${student.pass ? "Yes" : "No"})`;
            resultsList.appendChild(listItem);
        });

        resultsContainer.appendChild(resultsList);

        const passPercentage = document.createElement("p");
        passPercentage.textContent = `Class Pass Percentage: ${data.passPercentage}%`;
        resultsContainer.appendChild(passPercentage);
    }
});