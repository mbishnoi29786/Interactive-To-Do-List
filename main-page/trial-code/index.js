
let USER;

window.addEventListener('load', function() {
    USER = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!USER) {
        window.location.href = '../../login-page/user_login.html';
    } else {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === USER);
        document.getElementById('displayUsername').textContent = `Hello, ${user.username}!`;
        const userLists = JSON.parse(localStorage.getItem(USER)) || [];
        displayLists(userLists); // Function to display user's to-do lists
        console.log(userLists);
    }
});

import { createSearchDiv, showSearchDialog} from "./Search_functionality/search.js";

USER = JSON.parse(sessionStorage.getItem('loggedInUser'));
const sidebar = document.getElementById('sideBar');
const searchDiv = createSearchDiv(USER);
searchDiv.addEventListener('click', () =>  showSearchDialog(USER))
sidebar.appendChild(searchDiv);



// const filteredList = filterTasks(USER);

// displayLists(filteredList);


// Display user's to-do lists
function displayLists(lists) {
    const listsContainer = document.getElementById('listsContainer');

    listsContainer.innerHTML = '';
    lists.forEach(list => {
        createListCard(list);
    });
}

// Create a new to-do list card
function createListCard(list) {
    const listsContainer = document.getElementById('listsContainer');

    // Create card element
    let card = document.createElement('div');
    card.className = 'todo-card';

    let createTaskDiv = document.createElement('div');
    createTaskDiv.className = 'create-task-div';

    // Close button for list
    let spanClose = document.createElement('SPAN');
    spanClose.className = 'closeList';
    spanClose.textContent = '\u00D7';
    spanClose.addEventListener('click', function() {
        removeList(list); // Remove list from storage
    });
    card.appendChild(spanClose);

    // List title
    let h3 = document.createElement('h3');
    h3.textContent = list.name;
    card.appendChild(h3);

    // Task input, button, and deadline input
    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Add a new task...';
    input.className = 'task-input';

    let deadlineInput = document.createElement('input');
    deadlineInput.type = 'datetime-local';
    deadlineInput.className = 'deadline-input';

    let addTaskBtn = document.createElement('span');
    addTaskBtn.className = 'addTaskBtn';
    addTaskBtn.textContent = 'Add';
    addTaskBtn.addEventListener('click', function() {
        let taskExist = list.tasks.find(tasks => tasks.taskName === input.value.trim());
        let deadlineValue = new Date(deadlineInput.value);
        let now = new Date();

        if (input.value.trim() === '') 
        {
            alert("Write a task!");
        } 
        else if (taskExist) 
        {
            alert("Task Already Exists!!");
        }
        else if (isNaN(deadlineValue))
        {
            alert("Enter a dealine!!");
        } 
        else if (deadlineValue <= now) 
        {
            alert("Deadline must be in the future!");
        } 
        else 
        {
            list.tasks.push({
                taskName: input.value.trim(),
                deadline: deadlineInput.value,
                completed: false
            });
            updateListsInStorage(list.name, list.tasks);
            displayTasks(list.tasks, ul, list.name);
            input.value = '';
            deadlineInput.value = '';
        }
    });

    createTaskDiv.appendChild(input);
    createTaskDiv.appendChild(deadlineInput);
    createTaskDiv.appendChild(addTaskBtn);
    card.appendChild(createTaskDiv);

    // Task list
    let ul = document.createElement('ul');
    ul.className = 'task-list';
    displayTasks(list.tasks, ul, list.name);
    card.appendChild(ul);

    listsContainer.appendChild(card);
}


function displayTasks(tasks, ul, listName) {
    ul.innerHTML = '';

    tasks.forEach(task => {

        let li = document.createElement('li');
        li.setAttribute('draggable', true);
        li.className = 'task';

        let dragIconSpan = document.createElement('SPAN');
        dragIconSpan.className = 'drag-icon-span';

        let dragIcon = document.createElement('img');
        dragIcon.src = '../../pictures/drag-icon.png';
        dragIcon.setAttribute('draggable', false);
        dragIcon.setAttribute('alt', 'drag' );
        dragIcon.className = 'drag-icon';

        dragIconSpan.appendChild(dragIcon);
        li.appendChild(dragIconSpan);

        let taskText = document.createElement('SPAN');
        taskText.className = 'task-text';
        taskText.textContent = `${task.taskName}`;
        li.appendChild(taskText);

        if (task.completed) {
            li.classList.add('checked');
        }

        // Mark task as completed
        li.addEventListener('click', function() {
            task.completed = !task.completed;
            li.classList.toggle('checked');
            updateTaskStatus(listName, task.taskName, task.completed);
        });

        // Time left display
        let spanTimeLeft = document.createElement('SPAN');
        spanTimeLeft.className = 'time-left';

        // Calculate time left
        let deadline = new Date(task.deadline);
        startTimer(spanTimeLeft, deadline);

        // Close button
        let spanClose = document.createElement('SPAN');
        spanClose.className = 'close';
        spanClose.textContent = '\u00D7';
        spanClose.addEventListener('click', function() {
            removeTask(task.taskName, listName);
            li.remove();
        });

        li.appendChild(spanTimeLeft);
        li.appendChild(spanClose);
        ul.appendChild(li);
    });
}

// Initialize the timer
function startTimer(spanTimeLeft, deadline) {

    // Start the interval
        let intervalId = setInterval(updateTimeLeft, 60000); // Default to updating every minute initially

    // Function to update time left display
    function updateTimeLeft() {
        let now = new Date();
        let timeLeft = deadline - now;

        if (timeLeft <= 0) {
            spanTimeLeft.textContent = 'Deadline passed';
            spanTimeLeft.style.color = '#f44336';
            clearInterval(intervalId); // Stop updating
            return;
        }

        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        if (days > 0) {
            spanTimeLeft.textContent = `${days}d ${hours}h left`;
            spanTimeLeft.style.color = 'green';
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(updateTimeLeft, 3600000); // Update every hour
        } else if (hours > 0) {
            spanTimeLeft.textContent = `${hours}h ${minutes}m left`;
            spanTimeLeft.style.color = hours < 2 ? 'orange' : 'green';
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(updateTimeLeft, 60000); // Update every minute
        } else {
            spanTimeLeft.textContent = `${minutes}m ${seconds}s left`;
            spanTimeLeft.style.color = minutes < 1 ? 'red' : 'orange';
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(updateTimeLeft, 1000); // Update every second
        }
    }

    // Initial update
    updateTimeLeft();
}


// Handle adding a new to-do list
const addListBtn = document.getElementById('addListBtn');
addListBtn.addEventListener('click', function() {
    let listNameInput = document.getElementById('listNameInput');
    let listName = listNameInput.value.trim();
    let userLists = JSON.parse(localStorage.getItem(USER)) || [];
    let listExist = userLists.find(lists => lists.name === listName);

    if (listName === '') 
    {
        alert("Please enter a name for the to-do list!");
    } 
    else if (listExist) 
    {
        alert("Two Lists cannot have the same name!");
    } 
    else 
    {
        userLists.push({ name: listName, tasks: [] });
        localStorage.setItem(USER, JSON.stringify(userLists));
        displayLists(userLists);
        listNameInput.value = '';
    }
});

// Update lists in localStorage
function updateListsInStorage(listName, listTasks) {
    let userLists = JSON.parse(localStorage.getItem(USER)) || [];
    userLists.find(lists => lists.name === listName).tasks = listTasks;
    localStorage.setItem(USER, JSON.stringify(userLists));
}

// Update task status in localstorage
function updateTaskStatus (listName, taskName, taskStatus)
{
    
    let userLists = JSON.parse(localStorage.getItem(USER)) || [];
    let taskExists = userLists.find(lists => lists.name === listName).tasks.find(task => task.taskName === taskName);
    if (taskExists)
    {
        userLists.find(lists => lists.name === listName).tasks.find(task => task.taskName === taskName).completed = taskStatus;
        localStorage.setItem(USER, JSON.stringify(userLists));
    }
}

// Remove task from a list
function removeTask(taskToRemove, listName) {
    let userLists = JSON.parse(localStorage.getItem(USER)) || [];

    let updatedLists = userLists.map(list => {
        if (list.name === listName) {
            list.tasks = list.tasks.filter(task => task.taskName !== taskToRemove);
        }
        return list;
    });

    localStorage.setItem(USER, JSON.stringify(updatedLists));
    displayLists(updatedLists); // Re-display the updated lists
}


// Remove a list
function removeList(listToRemove) {
    let allLists = JSON.parse(localStorage.getItem(USER)) || [];

    allLists = allLists.filter(list => list.name !== listToRemove.name);

    localStorage.setItem(USER, JSON.stringify(allLists));
    displayLists(allLists); // Re-display the updated lists
}

// // Logout functionality
// const logOutButton = document.getElementById('logOutBtn');
// logOutButton.addEventListener('click', function() {
//     sessionStorage.setItem('loggedInUser', JSON.stringify(null));
//     window.location.href = "../../login-page/user_login.html";
// });


