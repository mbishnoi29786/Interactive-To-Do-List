let USER;

window.addEventListener('load', function(){
    USER = JSON.parse(sessionStorage.getItem('loggedInUser'));
    console.log(USER);
    if (!USER)
    {
        window.location.href = '../login-page/user_login.html';
    }
    else
    {
        const users = JSON.parse(sessionStorage.getItem(USER)) || []
        console.log(users);
    }
})

// Create a "close" button and append it to each list item
let myNodelist = document.getElementsByTagName("LI");

for (let i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
let close = document.getElementsByClassName("close");

for (let i = 0; i < close.length; i++) {
    close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
    }
}

// Add a "checked" symbol when clicking on a list item
let list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    }
}, false);

// Create a new list item when clicking on the "Add" button
const addTaskButton = document.querySelector('.addTaskBtn');
addTaskButton.addEventListener('click', newElement);
function newElement() 
{
    let li = document.createElement("li");
    let inputValue = document.getElementById("myInput").value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') 
    {
        alert("Write a task!");
    } 

    else if(inputValue.length < 3 || inputValue.length > 50)
    {
        alert("Task name should lie between 3 and 50!");
    }
    else 
    {
        addTask(inputValue);
        document.getElementById("myUL").appendChild(li);
    }

    document.getElementById("myInput").value = "";

    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) 
    {
        close[i].onclick = function() 
        {
            let div = this.parentElement;
            div.style.display = "none";
        }
    }
}   

function addTask(inputValue)
{   
    let loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser')) || {};
    console.log(loggedInUser);
    let loggedInUserTasks = JSON.parse(localStorage.getItem(`${loggedInUser}`)) || {};
    console.log(loggedInUserTasks);
    console.log(inputValue);
    loggedInUserTasks = {...loggedInUserTasks, task1 : `${inputValue}`};
    console.log(loggedInUserTasks);
    localStorage.setItem(`${loggedInUser}`, JSON.stringify(loggedInUserTasks));
}

function removeTask(inputValue) {
    let tasks = JSON.parse(localStorage.getItem(`${USER}`)) || [];
    tasks = tasks.filter(task => task !== inputValue);
    localStorage.setItem(USER.email, JSON.stringify(tasks));
}


// {"0":"a","1":"b","2":"c","3":"@","4":"g","5":"m","6":"a","7":"i","8":"l","9":".","10":"c","11":"o","12":"m","task1":"abc"}
