import { clearError, displayError, isEmpty, validateEmail } from "./element-utils.js";

// Debounce function to delay the API request
export function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Function to check if the email exists
export async function checkEmailExists() {
    const emailValue = email.value.trim();
    
    if (emailValue) {
        try {
            const response = await fetch('http://localhost:5500/api/auth/checkEmailExistence', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailValue })
            });

            const data = await response.json();
            if (response.ok) {
                // No user with that email exists
                clearError(email);
            } else {
                // Email already exists
                displayError(email, data.error);
            }
        } catch (error) {
            console.error('Error checking email existence:', error);
        }
    }
}

export async function checkUsernameExistance(params) {
    const usernameValue = username.value.trim();

    if (username)
    {
        try {
            const response = await fetch('http://localhost:5500/api/auth/checkUsernameExistence', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: usernameValue })
            });

            const data = await response.json();
            if (response.ok) {
                // No user with that username exists
                clearError(username);
            } else {
                // Username already exists
                displayError(username, data.error);
            }
        } catch (error) {
            
        }
    }
}

export function validateRegistrationInputs(formValues) {
    const { username, email, password, cpassword } = formValues;

    let success = true;

    if (!validateUsername(username)) success = false;
    if (!validateEmailField(email)) success = false;
    if (!validatePasswordField(password, cpassword)) success = false;

    return success;
}

export function validateUsername(usernameVal) {
    if (isEmpty(usernameVal)) return { valid: false, message: 'Username is required' };
    return { valid: true };
}


export function validateEmailField(emailVal) {
    if (isEmpty(emailVal)) {
        displayError(email, 'Email is required');
        return false;
    } else if (!validateEmail(emailVal)) {
        displayError(email, 'Please enter a valid email');
        return false;
    }
    clearError(email);
    return true;
}

function validatePasswordField(passwordVal, cpasswordVal) {
    console.log(`Uppercase: ${/[A-Z]/.test(passwordVal)}, Lowercase: ${/[a-z]/.test(passwordVal)}, Number: ${/[0-9]/.test(passwordVal)}, Special Charcter: ${/[^A-Za-z0-9]/.test(passwordVal)}`);
    
    if (isEmpty(passwordVal)) {
        displayError(password, 'Password is required');
        return false;
    } else if (passwordVal.length < 8) {
        displayError(password, 'Password must be at least 8 characters long');
        return false;
    }
    else if (!(/[A-Z]/.test(passwordVal))) {
        displayError(password, 'Password must contain atleast one uppercase letter.');
        return false;
    }
    else if (!(/[a-z]/.test(passwordVal))) {
        displayError(password, 'Password must contain atleast one lowercase letter.');
        return false;
    }
    else if (!(/[0-9]/.test(passwordVal))) {
        displayError(password, 'Password must contain atleast one number.');
        return false;
    }
    else if (!(/[^A-Za-z0-9]/.test(passwordVal))) {
        displayError(password, 'Password must contain atleast one special charater.');
        return false;
    }
    clearError(password);

    if (isEmpty(cpasswordVal)) {
        displayError(cpassword, 'Confirm password is required');
        return false;
    } else if (cpasswordVal !== passwordVal) {
        displayError(cpassword, 'Passwords do not match');
        return false;
    }
    clearError(cpassword);
    return true;
}