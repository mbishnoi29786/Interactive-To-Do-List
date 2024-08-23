const form = document.querySelector('#form')
const email = document.querySelector('#email');
const password = document.querySelector('#password');
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
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    let success = true

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
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    console.log(users);
    
    const user = users.find(user => user.email === emailVal)

    if (!user)
    {
        setError(inputGroup, 'No user Found!!');
        return false;
    }
    else if(user.password !== passwordVal)
    {
        setError(inputGroup, 'Wrong Password!!');
        return false
    }
    else
    {
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        return true;
    }

    
}