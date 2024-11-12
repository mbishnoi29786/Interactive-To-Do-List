function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log("Email Check Test: ",emailRegex.test(email));
    
    return emailRegex.test(email);
}

function isPasswordValid(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
    console.log("Running" , passwordRegex.test(password), password);
    return passwordRegex.test(password);
}

module.exports = { isValidEmail, isPasswordValid };
