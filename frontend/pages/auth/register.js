import { displayError, clearError, validateEmail, isEmpty } from "../../components/shared/element-utils.js";

const username = document.querySelector('#username');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const countryCode = document.querySelector('#country-code');
const password = document.querySelector('#password');
const cpassword = document.querySelector('#cpassword');
const registerForm = document.getElementById('form');
const additionalInfo = document.getElementById('additional-info');
const emailStep = document.getElementById('email-step');
const nextStepButton = document.getElementById('next-step');


function validateEmailField(emailVal) {
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


// Function to check if email exists by calling the backend
async function checkEmailExistence(emailVal) {
    try {
        const response = await fetch('/api/auth/register', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailVal }),
        });

        const data = await response.json();

        if (data.exists) {
            displayError(email, 'Email already exists');
            return false;
        } else {
            clearError(email);
            return true;
        }
    } catch (error) {
        console.error('Error checking email existence:', error);
        displayError(email, 'There was an error checking email. Please try again.');
        return false;
    }
}

nextStepButton.addEventListener('click', async () => {
    if (validateEmailField(email.value)) {
        // Backend check if email exists
        const emailValid = await checkEmailExistence(email.value);
        console.log(emailValid);
        if (emailValid) {
            emailStep.style.display = 'none';
            additionalInfo.style.display = 'block';
        }
    }
});

function validateUsername(usernameVal) {
    if (isEmpty(usernameVal)) {
        displayError(username, 'Username is required');
        return false;
    }
    clearError(username);
    return true;
}

function validateRegistrationInputs() {
    const formValues = {
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
        cpassword: cpassword.value.trim(),
        phone: phone.value.trim()
    };

    let success = true;

    // Validate fields
    if (!validateUsername(formValues.username)) success = false;
    if (!validateEmailField(formValues.email)) success = false;
    if (!validatePasswordField(formValues.password, formValues.cpassword)) success = false;
    if (!validatePhoneField(formValues.phone)) success = false;

    return success;
}

// Password validation requirements
const requirements = {
    minLength: document.querySelector("#minLength"),
    upperCase: document.querySelector("#upperCase"),
    lowerCase: document.querySelector("#lowerCase"),
    number: document.querySelector("#number"),
    specialChar: document.querySelector("#specialChar")
};

function validatePassword() {
    const value = password.value;
    requirements.minLength.classList.toggle("valid", value.length >= 8);
    requirements.upperCase.classList.toggle("valid", /[A-Z]/.test(value));
    requirements.lowerCase.classList.toggle("valid", /[a-z]/.test(value));
    requirements.number.classList.toggle("valid", /[0-9]/.test(value));
    requirements.specialChar.classList.toggle("valid", /[^A-Za-z0-9]/.test(value));
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

function validatePhoneField(phoneVal) {
    const selectedCountryCode = countryCode.value;
    const phoneDetails = countryPhonePatterns[selectedCountryCode];
    const phoneRegex = phoneDetails.regex;

    if (isEmpty(phoneVal)) {
        displayError(phone, "Phone number is required");
        return false;
    } else if (!phoneRegex.test(phoneVal)) {
        displayError(phone, `Enter a valid phone number (${phone.placeholder})`);
        return false;
    }
    clearError(phone);
    return true;
}

password.addEventListener("input", validatePassword);

registerForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const isValid = validateRegistrationInputs();

    // Only submit the form if all validations pass
    if (isValid) {
        
        console.log("Form is valid. Submitting...");
        registerForm.submit(); // or handle your submission logic
    }
});

const countryPhonePatterns = {
    "+1": {
        regex: /^[0-9]{10}$/,
        placeholder: "1234567890 (10 digits)"
    },
    "+91": {
        regex: /^[0-9]{10}$/,
        placeholder: "1234567890 (10 digits)"
    },
    "+44": {
        regex: /^[0-9]{10}$/,
        placeholder: "1234567890 (10 digits)"
    },
};

// Update placeholder and regex based on selected country code
countryCode.addEventListener('change', (event) => {
    const selectedCode = event.target.value;
    const phoneDetails = countryPhonePatterns[selectedCode];
    phone.placeholder = phoneDetails.placeholder;
    clearError(phone); // Clear any existing errors when country changes
});

phone.addEventListener('blur', () => {
    validatePhoneField(phone.value);
});


// import { clearError, displayError, isEmpty, isPasswordValid, validateEmail } from "../../components/shared/element-utils.js";

// const form = document.querySelector('#form')
// const username = document.querySelector('#username');
// const email = document.querySelector('#email');
// const password = document.querySelector('#password');
// const cpassword = document.querySelector('#cpassword');
// const inputGroup = document.querySelector('.input-group');
// form.addEventListener('submit',async (e)=>
// {
//     e.preventDefault();

//     if(!validateRegistrationInputs()){
//         return;
//     }

//     // Await the result of validateRegistrationInputs to ensure it completes
//     if (validateRegistrationInputs()) {
//         const isRegistered = await registerUser(); // Await the registration result
//         if (isRegistered) {
//             // Redirect to the login page or handle successful registration
//             // window.location.href = '../login/login.html'; 
//             console.log("Working");
//         }
//     }
// })


// function validateRegistrationInputs() {
//     const formValues = {
//         username: username.value.trim(),
//         email: email.value.trim(),
//         password: password.value.trim(),
//         cpassword: cpassword.value.trim()
//     };

//     let success = true;

//     // Now you can pass `formValues` directly
//     if (!validateUsername(formValues.username)) success = false;
//     if (!validateEmailField(formValues.email)) success = false;
//     if (!validatePasswordField(formValues.password, formValues.cpassword)) success = false;

//     return success;
// }

// async function registerUser() {
//     const userData = {
//         username: username.value.trim(),
//         email: email.value.trim(),
//         password: password.value.trim(),
//     };

//     try {
//         const response = await fetch('http://localhost:3000/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(userData),
//         });
//         const data = await response.json();
//         if (response.ok) {
//         alert(data.message);
//         return true;
//         } else {
//         displayError(inputGroup, data.error);
//         return false;
//         }
//     } catch (error) {
//         displayError(inputGroup, 'Registration failed');
//         return false;
//     }
// }

