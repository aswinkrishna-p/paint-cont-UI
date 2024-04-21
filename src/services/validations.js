// Validation function for email using regex
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validation function for password minimum length
function isValidPassword(password) {
    return password.length >= 6; // minimum length of password
}

function isValiduserName(username){
    const nameRegex =  /^[a-zA-Z]{3,}$/;
    return nameRegex.test(username);
}
    

export{
    isValidEmail,
    isValidPassword,
    isValiduserName
}