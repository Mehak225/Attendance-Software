//---------------------teacher login--------------------------//
function teacherlogin() {
    var usernameInput = document.getElementById("teachUsername");
    var passwordInput = document.getElementById("teachPassword");
    var username = usernameInput.value;
    var password = passwordInput.value;
    if (username === "miss" && password === "123456789") {
        alert("Login successful. Redirecting to the dashboard...");
        passwordInput.value = "";
        usernameInput.value = "";
        document.getElementById("loginform").style.display = "none";
        document.getElementById("dashboard2").style.display = "block";
    } else {
        alert("Invalid username or password. Please try again.");
        passwordInput.value = "";
        usernameInput.value = "";
    }
}
//-----------student from admin----------------//
function displayStudentList() {
    const studentList = document.getElementById("user-student-list");
    studentList.innerHTML = '';
    let existingStudents = JSON.parse(localStorage.getItem("students")) || [];
    existingStudents.forEach((student) => {
        const newRow = studentList.insertRow(-1);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);
        cell1.innerHTML = student.studentId;
        cell2.innerHTML = student.studentName;
        cell3.innerHTML = student.fatherName;
        cell4.innerHTML = student.studentClass;
        cell5.innerHTML = student.dateOfBirth;
        cell6.innerHTML = student.phoneNumber;
    });
}
displayStudentList(); 
// --------------attendence----------------//
document.addEventListener("DOMContentLoaded", function () {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const attendanceList = document.getElementById("attendance-list");

    function hideAttendancePage() {
        const attendancePage = document.getElementById("attendance");
        attendancePage.style.display = "none";
    }
    
    students.forEach((student, index) => {
        const newRow = attendanceList.insertRow(-1);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        cell1.innerHTML = student.studentId;
        cell2.innerHTML = student.studentName;
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        cell3.innerHTML = formattedDate;
        const attendanceInput = document.createElement("input");
        attendanceInput.id = `student${index + 1}`;
        attendanceInput.placeholder = "P/A/L";
        attendanceInput.addEventListener("input", function () {
            const value = this.value.trim().toLowerCase();
            if (value === "p" || value === "a" || value === "l") {
                this.value = value.toUpperCase();
                markAndDisplayAttendance(student.studentId, student.studentName, value);
            } else {
                alert('ERROR!');
            }
        });
        cell4.appendChild(attendanceInput);
    });

    function markAndDisplayAttendance(studentId, studentName, attendanceStatus) {
        const attendanceData = JSON.parse(localStorage.getItem("attendanceData")) || [];
        attendanceData.push({ studentId, studentName, attendanceStatus });
        localStorage.setItem("attendanceData", JSON.stringify(attendanceData));
    }

    document.getElementById("markAttendance").addEventListener("click", function () {
        alert("ATTENDANCE COMPLETED");
        hideAttendancePage();
        window.location.href = "user.html";
    });
})

//-------------active-----------------//
function toggleForm(event, classType) {
    event.preventDefault();
    const span = document.getElementById("span");
    const attendance = document.getElementById("attendance");
    const studentTable = document.getElementById("body");
    const tableHeading = document.getElementById("table-heading");
    const links = document.querySelectorAll("ul li a");
    links.forEach(link => link.classList.remove("active"));
    if (classType === "hom") {
        studentTable.style.display = "none";
        tableHeading.style.display = "none";
        attendance.style.display ="none";
        span.style.display="block";
    } else if (classType === "list") {
        studentTable.style.display = "flex";
        tableHeading.style.display = "block";
        span.style.display="none";
        attendance.style.display ="none";
    } else if (classType === "attendance") {
        studentTable.style.display = "none";
        tableHeading.style.display = "none";
        span.style.display="none";
        attendance.style.display ="block";
    }
    const activeLink = document.querySelector(`ul li a[onclick^="toggleForm(event, '${classType}')"]`);
    if (activeLink) {
        activeLink.classList.add("active");
    }
}