// ============================================
// STUDENT RESULT WEB APPLICATION
// ============================================

// Student marks
const marks = [
    {
        subject: "Computer Networks",
        mark: 86
    },
    {
        subject: "DevOps and Software Development",
        mark: 91
    },
    {
        subject: "Cryptography and Cyber Security",
        mark: 78
    },
    {
        subject: "Internet Programming",
        mark: 88
    },
    {
        subject: "UI/UX Design",
        mark: 82
    }
];


// ============================================
// CALCULATE TOTAL MARKS
// ============================================

function calculateTotal() {

    let total = 0;

    for (let i = 0; i < marks.length; i++) {
        total += marks[i].mark;
    }

    return total;
}


// ============================================
// CALCULATE PERCENTAGE
// ============================================

function calculatePercentage(total) {

    const maximumMarks = marks.length * 100;

    return (total / maximumMarks) * 100;
}


// ============================================
// CALCULATE GRADE
// ============================================

function calculateGrade(percentage) {

    if (percentage >= 90) {
        return "A+";
    } 
    else if (percentage >= 80) {
        return "A";
    } 
    else if (percentage >= 70) {
        return "B+";
    } 
    else if (percentage >= 60) {
        return "B";
    } 
    else if (percentage >= 50) {
        return "C";
    } 
    else {
        return "F";
    }
}


// ============================================
// CALCULATE RESULT
// ============================================

function calculateResult() {

    for (let i = 0; i < marks.length; i++) {

        if (marks[i].mark < 40) {
            return "FAIL";
        }
    }

    return "PASS";
}


// ============================================
// DISPLAY RESULT
// ============================================

function displayResult() {

    const total = calculateTotal();

    const percentage = calculatePercentage(total);

    const grade = calculateGrade(percentage);

    const result = calculateResult();


    // Display total marks
    const totalMarksElement =
        document.getElementById("totalMarks");

    if (totalMarksElement) {
        totalMarksElement.textContent =
            total + " / " + (marks.length * 100);
    }


    // Display percentage
    const percentageElement =
        document.getElementById("percentage");

    if (percentageElement) {
        percentageElement.textContent =
            percentage.toFixed(0) + "%";
    }


    // Display overall grade
    const gradeElement =
        document.getElementById("overallGrade");

    if (gradeElement) {
        gradeElement.textContent = grade;
    }


    // Display result
    const resultElement =
        document.querySelector(".result-pass");

    if (resultElement) {

        resultElement.textContent = result;

        if (result === "FAIL") {
            resultElement.style.color = "#dc2626";
        }
    }


    // Update progress bar
    const progressFill =
        document.querySelector(".progress-fill");

    if (progressFill) {

        progressFill.style.width =
            percentage + "%";
    }


    // Update performance percentage
    const progressPercentage =
        document.querySelector(".progress-label strong");

    if (progressPercentage) {

        progressPercentage.textContent =
            percentage.toFixed(0) + "%";
    }
}


// ============================================
// PAGE LOAD
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    displayResult();

});