import { displayError } from "../../components/shared/element-utils.js";
import { checkEmailExists, checkUsernameExistance, debounce, registerUser, validateEmailField, validateRegistrationInputs } from "../../components/shared/login-register-utils.js";

const username = document.querySelector('#username');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const password = document.querySelector('#password');
const cpassword = document.querySelector('#cpassword');
const registerForm = document.getElementById('form');
const registerUserBtn = document.getElementById('register-user');
const userRegistrationError = document.querySelector('.errorRegistration')


// Added event listener to email input field
email.addEventListener('input', debounce(() => checkEmailExists(email), 1000));  // 1 second debounce

// Added event listener to username input field
username.addEventListener('input', debounce(() => checkUsernameExistance(username), 1000)) // 1 second debounce

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

password.addEventListener("input", validatePassword);

registerUserBtn.addEventListener('click', async (event) => {
    event.preventDefault();  // Prevent form submission

        // Proceed with the registration logic
        const formValues = {
            username: username.value.trim(),
            email: email.value.trim(),
            password: password.value.trim(),
            cpassword: cpassword.value.trim(),
        };

        // Validate other fields and submit if valid
        if (validateRegistrationInputs(formValues)) {
            console.log("Form is valid. Submitting...");
            const userRegistered = registerUser(email, username, password, cpassword,userRegistrationError);
            if (!userRegistered)
            {
                displayError(userRegistrationError, userRegistered.error);
            }
            console.log('running');
        }
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

