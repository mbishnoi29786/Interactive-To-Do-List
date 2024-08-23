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
        window.location.href = '../main-page/index.html'; 
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
        setError(username,'Username is required')
    }
    else
    {
        setSuccess(username)
    }

    if(emailVal==='')
    {
        success = false;
        setError(email,'Email is required')
    }
    else if(!validateEmail(emailVal))
    {
        success = false;
        setError(email,'Please enter a valid email')
    }
    else
    {
        setSuccess(email)
    }

    if(passwordVal === '')
    {
        success= false;
        setError(password,'Password is required')
    }
    else if(passwordVal.length<8)
    {
        success = false;
        setError(password,'Password must be atleast 8 characters long')
    }
    else
    {
        setSuccess(password)
    }

    if(cpasswordVal === '')
    {
        success = false;
        setError(cpassword,'Confirm password is required')
    }
    else if(cpasswordVal!==passwordVal)
    {
        success = false;
        setError(cpassword,'Password does not match')
    }
    else
    {
        setSuccess(cpassword)
    }

    return success;

}

//element - password, msg- pwd is reqd
function setError(element,message)
{
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector('.error')

    errorElement.innerText = message;
    inputGroup.classList.add('error')
    inputGroup.classList.remove('success')
}

function setSuccess(element)
{
    const inputGroup = element.parentElement;
    const errorElement = inputGroup.querySelector('.error')

    errorElement.innerText = '';
    inputGroup.classList.add('success')
    inputGroup.classList.remove('error')
}

const validateEmail = (email) => 
    {
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

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

        setError(inputGroup, 'Email already exists!')
        return false;
    }
    else if(usernameExists)
    {
        setError(inputGroup, 'Username already exists!');
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
        localStorage.setItem('users', JSON.stringify(users))
        alert('User Registered Successfully!!');
    }
    return true;
}