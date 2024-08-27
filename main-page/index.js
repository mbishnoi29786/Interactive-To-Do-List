let USER;

window.addEventListener('load', function() {
    USER = JSON.parse(sessionStorage.getItem('loggedInUser'));
    console.log(USER);
    if (!USER) {
        window.location.href = '../login-page/user_login.html';
    } else {
        const users = JSON.parse(localStorage.getItem(USER)) || [];
        console.log(users);
        displayTasks(users); // Function to display tasks for the logged-in user
    }
});

// Display tasks and add close buttons
function displayTasks(tasks) {
    tasks.forEach(task => {
        createTaskElement(task);
    });
}

// Create a new list item element
function createTaskElement(task) {
    let li = document.createElement("li");
    let t = document.createTextNode(task);
    li.appendChild(t);

    // Create close button
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    document.getElementById("myUL").appendChild(li);

    // Add event listener for close button
    span.onclick = function() {
        let taskText = this.parentElement.textContent.slice(0, -1);
        this.parentElement.remove();
        removeTask(taskText); // Remove task from storage
    };
}

// Handle adding a new task
const addTaskButton = document.querySelector('.addTaskBtn');
addTaskButton.addEventListener('click', function() {
    let inputValue = document.getElementById("myInput").value;
    if (inputValue === '') {
        alert("Write a task!");
    } else if (inputValue.length < 3 || inputValue.length > 50) {
        alert("Task name should lie between 3 and 50 characters!");
    } else {
        createTaskElement(inputValue); // Create the task in the UI
        addTask(inputValue); // Add the task to localStorage
        document.getElementById("myInput").value = "";
    }
});

function addTask(inputValue) {
    let loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    console.log(loggedInUser);
    let loggedInUserTasks = JSON.parse(localStorage.getItem(loggedInUser)) || [];
    console.log(loggedInUserTasks);
    loggedInUserTasks.push(inputValue);
    localStorage.setItem(loggedInUser, JSON.stringify(loggedInUserTasks));
}

function removeTask(inputValue) {
    let loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    let tasks = JSON.parse(localStorage.getItem(loggedInUser)) || [];
    tasks = tasks.filter(task => task !== inputValue);
    localStorage.setItem(loggedInUser, JSON.stringify(tasks));
}


const logOutButton = document.querySelector('#logOutBtn');
logOutButton.addEventListener('click', logOut);

function logOut()
{
    sessionStorage.setItem('loggedInUser', JSON.stringify(null));
    window.location.href = "../login-page/user_login.html";
}