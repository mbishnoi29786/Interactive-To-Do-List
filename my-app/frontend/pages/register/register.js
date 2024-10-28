import { clearError, displayError, isEmpty, isPasswordValid, validateEmail } from "../../components/utils/login-register-utils.js";


const form = document.querySelector('#form')
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const cpassword = document.querySelector('#cpassword');
const inputGroup = document.querySelector('.input-group');
form.addEventListener('submit',(e)=>
{
    e.preventDefault();

    if(validateRegistrationInputs() && registerUser())
    {
        window.location.href = '../login/login.html'; 
    }
})

function validateRegistrationInputs()
{
    const usernameVal = username.value.trim()
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    const cpasswordVal = cpassword.value.trim();
    let success = true

    if(isEmpty(username))
    {
        success=false;
        displayError(username,'Username is required')
    }
    else
    {
        clearError(username)
    }

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

    if(isEmpty(cpassword))
    {
        success = false;
        displayError(cpassword,'Confirm password is required')
    }
    else if(cpasswordVal!==passwordVal)
    {
        success = false;
        displayError(cpassword,'Password does not match')
    }
    else
    {
        clearError(cpassword)
    }

    return success;

}


function registerUser()
{
    const usernameVal = username.value.trim()
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isEmailExists = users.some(user => user.email === emailVal);
    const isUsernameExists = users.some(user => user.username === usernameVal);
    if (isEmailExists)
    {

        displayError(inputGroup, 'Email already exists!')
        return false;
    }
    else if(isUsernameExists)
    {
        displayError(inputGroup, 'Username already exists!');
        return false;
    }
    else
    {
        const user =
        {
            username : usernameVal,
            email: emailVal,
            password: passwordVal,
            isLogin: true
        }
        
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        alert('User Registered Successfully!!');
    }
    return true;
}