import { clearError, displayError, isEmpty, isPasswordValid, validateEmail } from "../../components/shared/login-register-utils.js";

const form = document.querySelector('#form')
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const inputGroup = document.querySelector('.input-group');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateLoginInputs()) {
        return; // Early exit if validation fails
    }

    // Await the result of validateLoginInputs to ensure it completes
    if (validateLoginInputs()) {
        const isAuthenticated = await authenticateUser(); // Await the authentication result
        if (isAuthenticated) {
            // Redirect to the main page or handle successful login
            // window.location.href = '../main/index.html'; 
            console.log("Working");
        }
    }
});


function validateLoginInputs()
{
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    let success = true

    if(isEmpty(emailVal))
    {
        success = false;
        displayError(email,'Email is required')
    }
    else if(!validateEmail(emailVal))
    {
        success = false;
        displayError(email,'Please enter a valid email')
    }
    else
    {
        clearError(email)
    }

    if(isEmpty(passwordVal))
    {
        success= false;
        displayError(password,'Password is required')
    }
    else if(isPasswordValid(passwordVal))
    {
        success = false;
        displayError(password,'Password must be atleast 8 characters long')
    }
    else
    {
        clearError(password)
    }

    return success;

}

async function authenticateUser()
{
    const loginData = {
        email: email.value.trim(),
        password: password.value.trim()
    }

    try 
    {
        const response = await fetch('http://localhost:3000/api/auth/login', 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
        });

        const data = await response.json();
        if (response.ok) {
            sessionStorage.setItem('token', data.token);  // Save JWT token for authentication
            return true;
        }
        else {
            displayError(inputGroup, data.error);
            return false;
        }
    }
    catch (error)
    {
        console.log(error);
        displayError(inputGroup, 'Login failed');
        return false;
    }
}

// function authenticateUser()
// {
//     const emailVal = email.value.trim();
//     const passwordVal = password.value.trim();

//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     console.log(users);
    
//     const user = users.find(user => user.email === emailVal)

//     if (!user)
//     {
//         displayError(inputGroup, 'No user Found!!');
//         return false;
//     }
//     else if(user.password !== passwordVal)
//     {
//         displayError(inputGroup, 'Wrong Password!!');
//         return false
//     }
//     else
//     {
//         sessionStorage.setItem('loggedInUser', JSON.stringify(user.email));
//         return true;
//     }

// }