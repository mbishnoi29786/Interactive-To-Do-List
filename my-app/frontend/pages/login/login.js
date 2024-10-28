import { clearError, displayError, isEmpty, isPasswordValid, validateEmail } from "../../components/utils/login-register-utils.js";

const form = document.querySelector('#form')
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const inputGroup = document.querySelector('.input-group');
form.addEventListener('submit',(e)=>
{
    e.preventDefault();

    if(validateLoginInputs() && authenticateUser())
    {
        window.location.href = '../main/index.html'; 
    }
})

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

function authenticateUser()
{
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log(users);
    
    const user = users.find(user => user.email === emailVal)

    if (!user)
    {
        displayError(inputGroup, 'No user Found!!');
        return false;
    }
    else if(user.password !== passwordVal)
    {
        displayError(inputGroup, 'Wrong Password!!');
        return false
    }
    else
    {
        sessionStorage.setItem('loggedInUser', JSON.stringify(user.email));
        return true;
    }

}