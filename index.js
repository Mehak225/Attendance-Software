function login() {
    var usernameInput = document.getElementById("txtUsername");
    var passwordInput = document.getElementById("txtPassword");
    var username = usernameInput.value;
    var password = passwordInput.value;
    if (username === "user" && password === "12345") {
        alert("Login successful. Redirecting to the dashboard...");
        passwordInput.value = "";
        usernameInput.value = "";
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
    } else {
        alert("Invalid username or password. Please try again.");
        passwordInput.value = "";
        usernameInput.value = "";
    }
}
//---------------active class-----------------//
function toggleForm(event, formType) {
    event.preventDefault();  
    const attendance = document.getElementById("admin-attendence");
    const form = document.getElementById("form");
    const studentTable = document.getElementById("body");
    const tableHeading = document.getElementById("table-heading");
    const links = document.querySelectorAll("ul li a");
    links.forEach(link => link.classList.remove("active"));
    if (formType === "home") {
        form.style.display = "none";
        studentTable.style.display = "none";
        tableHeading.style.display = "none";
        attendance.style.display = "none";
    } else if (formType === "student") {
        form.style.display = "flex";
        studentTable.style.display = "none";
        tableHeading.style.display = "none";
        attendance.style.display = "none";
    } else if (formType === "newlist") {
        form.style.display = "none";
        studentTable.style.display = "block";
        tableHeading.style.display = "flex";
        attendance.style.display = "none";
    } else if (formType === "attendance") {
        form.style.display = "none";
        studentTable.style.display = "none";
        tableHeading.style.display = "none";
        attendance.style.display = "block";
    }
    const activeLink = document.querySelector(`ul li a[onclick="toggleForm(event, '${formType}')"]`);
    if (activeLink) {
        activeLink.classList.add("active");
    }
}
//------------form---------------//
function addStudent() {
    const studentId = document.getElementById("studentId").value;
    const studentName = document.getElementById("studentName").value;
    const fatherName = document.getElementById("fatherName").value;
    const studentClass = document.getElementById("studentClass").value;
    const dateOfBirth = document.getElementById("dateOfBirth").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    if (!studentId || !studentName || !fatherName || !studentClass || !dateOfBirth || !phoneNumber) {
        alert("Please fill in all required fields.");
        return; 
    }
    else{
        alert('SUCCESSFULLY ADDED')
    }
    const studentData = {
        studentId,
        studentName,
        fatherName,
        studentClass,
        dateOfBirth,
        phoneNumber
    };
    let existingStudents = JSON.parse(localStorage.getItem("students")) || [];
    existingStudents.push(studentData);
    localStorage.setItem("students", JSON.stringify(existingStudents));
    document.getElementById("form").reset();
    displayStudentList();
}
function displayStudentList() {
    const studentList = document.getElementById("admin-student-list");
    studentList.innerHTML = ''; 
    let existingStudents = JSON.parse(localStorage.getItem("students")) || [];
existingStudents.forEach((student, index) => {
    const newRow = studentList.insertRow(-1);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);
    const cell7 = newRow.insertCell(6);
    cell1.innerHTML = student.studentId;
    cell2.innerHTML = student.studentName;
    cell3.innerHTML = student.fatherName;
    cell4.innerHTML = student.studentClass;
    cell5.innerHTML = student.dateOfBirth;
    cell6.innerHTML = student.phoneNumber;
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-user-minus";

    deleteIcon.addEventListener("click", function () {
        deleteStudent(index);
    });
    cell7.appendChild(deleteIcon);
});
}
function deleteStudent(index) {
    let existingStudents = JSON.parse(localStorage.getItem("students")) || [];
    existingStudents.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(existingStudents));
    displayStudentList();
}
displayStudentList('user-student-list');
//--------------attendence-------------//
document.addEventListener("DOMContentLoaded", function () {
    const adminAttendanceTable = document.getElementById("admin-attendance-table").getElementsByTagName('tbody')[0];
    const showattendence = document.getElementById("attendence-table");
    const refreshTableButton = document.getElementById("refreshTableButton");
    
    showattendence.addEventListener("click", function () {
        while (adminAttendanceTable.firstChild) {
            adminAttendanceTable.removeChild(adminAttendanceTable.firstChild);
        }
        const attendanceData = JSON.parse(localStorage.getItem("attendanceData")) || [];
        attendanceData.forEach((data, index) => {
            addRowToAdminTable(data.studentId, data.studentName, data.attendanceStatus);
        });
        showattendence.click();
    });
    refreshTableButton.addEventListener("click", function () {
        clearTable();
    });
    function addRowToAdminTable(studentId, studentName, attendanceStatus) {
        const newRow = adminAttendanceTable.insertRow(-1);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        cell1.innerHTML = studentId;
        cell2.innerHTML = studentName;
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        cell3.innerHTML = formattedDate;
        cell4.innerHTML = attendanceStatus;
    }
    
    function clearTable() {
        while (adminAttendanceTable.firstChild) {
            adminAttendanceTable.deleteRow(adminAttendanceTable.firstChild);
        }
    }
});
