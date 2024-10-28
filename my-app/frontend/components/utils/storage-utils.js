// Save a new user to local storage
export function saveUserToLocalStorage(user) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Retrieve user by email from local storage
export function getUserByEmail(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.email === email);
}

// Check if email already exists
export function isEmailExists(email) {
    return !!getUserByEmail(email);
}

// Check if username already exists
export function isUsernameExists(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.username === username);
}

// Save logged-in user to session storage
export function saveLoggedInUser(user) {
    sessionStorage.setItem('loggedInUser', JSON.stringify(user.email));
}
