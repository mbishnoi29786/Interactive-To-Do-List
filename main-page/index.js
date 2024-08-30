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
    }
});

// Display user's to-do lists
function displayLists(lists) 
{
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

    // Close button
    let span = document.createElement('SPAN');
    span.className = 'close closeList';
    span.textContent = '\u00D7';
    span.addEventListener('click', function() 
    {
    let taskText = this.parentElement.textContent.slice(0, -1).trim(); //  remove the correct task
    this.parentElement.remove();
    removeList(list); // Remove task from storage
    });
    card.appendChild(span);

    // List title
    let h3 = document.createElement('h3');
    h3.textContent = list.name;
    card.appendChild(h3);

    // Task input and button
    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Add a new task...';
    input.className = 'task-input';

    let addTaskBtn = document.createElement('span');
    addTaskBtn.className = 'addTaskBtn';
    addTaskBtn.textContent = 'Add';
    addTaskBtn.addEventListener('click', function() {
        if (input.value.trim() === '') 
        {
            alert("Write a task!");
        } 
        else 
        {
            list.tasks.push(input.value.trim());
            updateListsInStorage();
            displayTasks(list.tasks, ul);
            input.value = '';
        }
    });

    card.appendChild(input);
    card.appendChild(addTaskBtn);

    // Task list
    let ul = document.createElement('ul');
    ul.className = 'task-list';
    displayTasks(list.tasks, ul);
    card.appendChild(ul);

    listsContainer.appendChild(card);
}

// Display tasks in a given list
function displayTasks(tasks, ul) {
    console.log(tasks, ul);
    ul.innerHTML = '';
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.textContent = task;
        ul.appendChild(li);

        // Mark task as completed
        li.addEventListener('click', function() 
        {
            li.classList.toggle('checked');
        });
        // Close button
        let span = document.createElement('SPAN');
        span.className = 'close';
        span.textContent = '\u00D7';
        span.addEventListener('click', function() 
        {
        let taskText = this.parentElement.textContent.slice(0, -1).trim(); //  remove the correct task
        this.parentElement.remove();
        removeTask(taskText); // Remove task from storage
        });
        li.appendChild(span);
    });
}

// Handle adding a new to-do list
const addListBtn = document.getElementById('addListBtn');
addListBtn.addEventListener('click', function() {
    let listNameInput = document.getElementById('listNameInput');
    let listName = listNameInput.value.trim();
    if (listName === '') {
        alert("Please enter a name for the to-do list!");
    } else {
        let userLists = JSON.parse(localStorage.getItem(USER)) || [];
        userLists.push({ name: listName, tasks: [] });
        localStorage.setItem(USER, JSON.stringify(userLists));
        displayLists(userLists);
        listNameInput.value = '';
    }
});

// Update lists in localStorage
function updateListsInStorage() {
    let userLists = Array.from(document.querySelectorAll('.todo-card')).map(card => {
        let name = card.querySelector('h3').textContent;
        let tasks = Array.from(card.querySelectorAll('.task-list li')).map(li => li.textContent.replace('×', '').trim());
        return { name, tasks };
    });
    console.log(userLists);
    localStorage.setItem(USER, JSON.stringify(userLists));
}

// Update lists in localStorage
function removeTask(taskToRemove) 
{
    let userLists = JSON.parse(localStorage.getItem(USER)) || [];
    
    // Update the correct list and remove the task
    userLists.forEach(list => {
        list.tasks = list.tasks.filter(task => task !== taskToRemove);
    });

    localStorage.setItem(USER, JSON.stringify(userLists));
    updateListsInStorage();
}

function removeList(list)
{
    let allLists = JSON.parse(localStorage.getItem(USER)) || [];

    // Update all the lists and remove the list clicked
    allLists.filter(allLists => allLists.name !== list.name);

    localStorage.setItem(USER, JSON.stringify(allLists));
    updateListsInStorage();
}

// Logout functionality
const logOutButton = document.getElementById('logOutBtn');
logOutButton.addEventListener('click', function() {
    sessionStorage.setItem('loggedInUser', JSON.stringify(null));
    window.location.href = "../login-page/user_login.html";
});
