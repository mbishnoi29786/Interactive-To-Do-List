import { clearError, displayError, validateEmail } from "../../components/utils/login-register-utils.js";

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
        window.location.href = '../login/login.html'; 
    }
})

function validateInputs()
{
    const usernameVal = username.value.trim()
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    const cpasswordVal = cpassword.value.trim();
    let success = true

    if(usernameVal==='')
    {
        success=false;
        displayError(username,'Username is required')
    }
    else
    {
        clearError(username)
    }

    if(emailVal==='')
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

    if(passwordVal === '')
    {
        success= false;
        displayError(password,'Password is required')
    }
    else if(passwordVal.length<8)
    {
        success = false;
        displayError(password,'Password must be atleast 8 characters long')
    }
    else
    {
        clearError(password)
    }

    if(cpasswordVal === '')
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
    const emailExits = users.some(user => user.email === emailVal);
    const usernameExists = users.some(user => user.username === usernameVal);
    if (emailExits)
    {

        displayError(inputGroup, 'Email already exists!')
        return false;
    }
    else if(usernameExists)
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