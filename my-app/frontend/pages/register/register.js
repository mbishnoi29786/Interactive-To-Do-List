import { clearError, displayError, isEmpty, isPasswordValid, validateEmail } from "../../components/utils/login-register-utils.js";
import { isEmailExists, isUsernameExists, saveUserToLocalStorage } from "../../components/utils/storage-utils.js";



const form = document.querySelector('#form')
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const cpassword = document.querySelector('#cpassword');
const inputGroup = document.querySelector('.input-group');
form.addEventListener('submit',(e)=>
{
    e.preventDefault();

    if(validateInputs() && registerUser())
    {
        // window.location.href = '../login/login.html'; 
        console.log("working");
        
    }
})


function validateInputs() {
    const formValues = {
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
        cpassword: cpassword.value.trim()
    };

    let success = true;

    // Now you can pass `formValues` directly
    if (!validateUsername(formValues.username)) success = false;
    if (!validateEmailField(formValues.email)) success = false;
    if (!validatePasswordField(formValues.password, formValues.cpassword)) success = false;

    return success;
}

async function registerUser() {
    const userData = {
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
    };
    
    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (response.ok) {
        alert(data.message);
        console.log("Working");
        return true;
        } else {
        displayError(inputGroup, data.error);
        return false;
        }
    } catch (error) {
        displayError(inputGroup, 'Registration failed');
        return false;
    }
}


// function registerUser()
// {
//     const usernameVal = username.value.trim()
//     const emailVal = email.value.trim();
//     const passwordVal = password.value.trim();

//     if (isEmailExists(emailVal))
//     {
//         displayError(inputGroup, 'Email already exists!')
//         return false;
//     }
//     else if(isUsernameExists(usernameVal))
//     {
//         displayError(inputGroup, 'Username already exists!');
//         return false;
//     }
    
//     const user =
//     {
//         username : usernameVal,
//         email: emailVal,
//         password: passwordVal,
//         isLogin: true
//     }
    
//     // users.push(user);
//     // localStorage.setItem('users', JSON.stringify(users));
//     saveUserToLocalStorage(user)
//     alert('User Registered Successfully!!');

//     return true;
// }




// Helper functions can now use the `formValues` object
function validateUsername(usernameVal) {
    if (isEmpty(usernameVal)) {
        displayError(username, 'Username is required');
        return false;
    } else {
        clearError(username);
        return true;
    }
}

function validateEmailField(emailVal) {
    if (isEmpty(emailVal)) {
        displayError(email, 'Email is required');
        return false;
    } else if (!validateEmail(emailVal)) {
        displayError(email, 'Please enter a valid email');
        return false;
    } else {
        clearError(email);
        return true;
    }
}

function validatePasswordField(passwordVal, cpasswordVal) {
    if (isEmpty(passwordVal)) {
        displayError(password, 'Password is required');
        return false;
    } else if (!isPasswordValid(passwordVal)) {
        displayError(password, 'Password must be at least 8 characters long');
        return false;
    } else {
        clearError(password);
    }

    if (isEmpty(cpasswordVal)) {
        displayError(cpassword, 'Confirm password is required');
        return false;
    } else if (cpasswordVal !== passwordVal) {
        displayError(cpassword, 'Passwords do not match');
        return false;
    } else {
        clearError(cpassword);
        return true;
    }
}