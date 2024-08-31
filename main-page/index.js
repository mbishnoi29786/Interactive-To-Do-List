let USER;

window.addEventListener('load', function() 
{
    USER = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!USER) 
    {
        window.location.href = '../../login-page/user_login.html';
    } 
    else 
    {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === USER);
        
        if (user) 
        {
            document.getElementById('displayUsername').textContent = `Hello, ${user.username}!`;
        } 
        else 
        {
            alert('User not found.');
            window.location.href = '../../login-page/user_login.html';
            return;
        }
        
        const userLists = JSON.parse(localStorage.getItem(USER)) || [];
        displayLists(userLists); // Function to display user's to-do lists
        console.log(userLists);
    }
});

// Display user's to-do lists
function displayLists(lists) 
{
    const listsContainer = document.getElementById('listsContainer');
    listsContainer.innerHTML = '';
    lists.forEach(list => 
    {
        list.tasks = list.tasks || []; // Ensure tasks is an array
        createListCard(list);
    });
}

// Create a new to-do list card
function createListCard(list) 
{
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
    addTaskBtn.addEventListener('click', function() 
    {
        let taskExist = list.tasks.find(tasks => tasks.taskName === input.value.trim());
        if (input.value.trim() === '') 
        {
            alert("Write a task!");
        } 
        else if (taskExist) 
        {
            alert("Task Already Exists!!");
        } 
        else 
        {
            list.tasks.push({
                taskName: input.value.trim(), 
            });
            console.log(list);
            updateListsInStorage(list.name, list.tasks);
            displayTasks(list.tasks, ul, list.name);
            input.value = '';
        }
    });

    card.appendChild(input);
    card.appendChild(addTaskBtn);

    // Task list
    let ul = document.createElement('ul');
    ul.className = 'task-list';
    displayTasks(list.tasks, ul, list.name);
    card.appendChild(ul);

    listsContainer.appendChild(card);
}

// Display tasks in a given list
function displayTasks(tasks, ul, listName) 
{
    ul.innerHTML = '';

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.textContent = `${task.taskName}`;
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
            removeTask(task.taskName, listName); // Remove task from storage
            li.remove();
        });
        li.appendChild(span);
    });
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
        alert("Two Lists cannot have the same name!!");
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
function updateListsInStorage(listName, listTasks) 
{
    let userLists = JSON.parse(localStorage.getItem(USER)) || [];
    let list = userLists.find(lists => lists.name === listName);
    if (list) 
    {
        list.tasks = listTasks;
        localStorage.setItem(USER, JSON.stringify(userLists));
    }
}

// Remove task from a list
function removeTask(taskToRemove, listName) 
{
    let userLists = JSON.parse(localStorage.getItem(USER)) || [];

    // Find the correct list and remove the task
    let updatedLists = userLists.map(list => 
    {
        if (list.name === listName) 
        {
            list.tasks = list.tasks.filter(task => task.taskName !== taskToRemove);
        }
        return list;
    });

    // Update localStorage with the new list of tasks
    localStorage.setItem(USER, JSON.stringify(updatedLists));
    displayLists(updatedLists); // Re-display the updated list
}

// Remove an entire list
function removeList(listToRemove) 
{
    let allLists = JSON.parse(localStorage.getItem(USER)) || [];

    // Filter out the list to be removed
    allLists = allLists.filter(list => list.name !== listToRemove.name);

    // Update localStorage with the remaining lists
    localStorage.setItem(USER, JSON.stringify(allLists));
    displayLists(allLists); // Re-display the updated lists
}

// Logout functionality
const logOutButton = document.getElementById('logOutBtn');
logOutButton.addEventListener('click', function() {
    sessionStorage.setItem('loggedInUser', JSON.stringify(null));
    window.location.href = "../../login-page/user_login.html";
});
