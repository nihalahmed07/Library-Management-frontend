function loginUser() {
    var userEmail = document.getElementById('userEmail').value;
    var userPassword = document.getElementById('userPassword').value;

    if (userEmail === "user@devrev.com" && userPassword === "user123") {
        window.location.href = 'loading.html';
    } else {
        alert('Wrong credentials. Please try again.');
    }
}

function adminlog() {
    var adminEmail = document.getElementById('adminEmail').value;
    var adminPassword = document.getElementById('adminPassword').value;

    if (adminEmail === "admin@devrev.com" && adminPassword === "admin123") {
        window.location.href = 'loading.html';
    } else {
        alert('Wrong credentials. Please try again.');
    }
}

function signup() {
        window.location.href = 'signup.html';
}