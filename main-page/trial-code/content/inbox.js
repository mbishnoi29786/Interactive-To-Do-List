export function Inbox(USER)
{
    const contentSection = document.querySelector('#content');

    const inboxDiv = document.createElement('div');
    inboxDiv.className = 'inbox-div';
    inboxDiv.id = 'inbox';

    const heading = document.createElement('h1');
    heading.className = 'inbox-heading';
    heading.textContent = 'Inbox';

    const userLists = localStorage.getItem(USER) || [];
    const filtered_list = userLists.find(list=> list.listname == 'inbox');

    console.log(filtered_list);
}

function displayLists(lists) {
    const listsContainer = document.getElementById('listsContainer');

    listsContainer.innerHTML = '';
    lists.forEach(list => {
        createListCard(list);
    });
}


// // Create a new to-do list card
// function createListCard(list) {
//     const listsContainer = document.getElementById('listsContainer');

//     // Create card element
//     let card = document.createElement('div');
//     card.className = 'todo-card';

//     let createTaskDiv = document.createElement('div');
//     createTaskDiv.className = 'create-task-div';

//     // Close button for list
//     let spanClose = document.createElement('SPAN');
//     spanClose.className = 'closeList';
//     spanClose.textContent = '\u00D7';
//     spanClose.addEventListener('click', function() {
//         removeList(list); // Remove list from storage
//     });
//     card.appendChild(spanClose);

//     // List title
//     let h3 = document.createElement('h3');
//     h3.textContent = list.name;
//     card.appendChild(h3);

//     // Task input, button, and deadline input
//     let input = document.createElement('input');
//     input.type = 'text';
//     input.placeholder = 'Add a new task...';
//     input.className = 'task-input';

//     let taskDescription = document.createElement('input');
//     taskDescription.type = 'text';
//     taskDescription.placeholder = 'Add description';
//     taskDescription.className = 'task-description';

//     let deadlineInput = document.createElement('input');
//     deadlineInput.type = 'datetime-local';
//     deadlineInput.className = 'deadline-input';

//     let addTaskBtn = document.createElement('span');
//     addTaskBtn.className = 'addTaskBtn';
//     addTaskBtn.textContent = 'Add';
//     addTaskBtn.addEventListener('click', function() {
//         let taskExist = list.tasks.find(tasks => tasks.taskName === input.value.trim());
//         let deadlineValue = new Date(deadlineInput.value);
//         let now = new Date();

//         if (input.value.trim() === '') 
//         {
//             alert("Write a task!");
//         } 
//         else if (taskExist) 
//         {
//             alert("Task Already Exists!!");
//         }
//         else if (isNaN(deadlineValue))
//         {
//             alert("Enter a dealine!!");
//         } 
//         else if (deadlineValue <= now) 
//         {
//             alert("Deadline must be in the future!");
//         } 
//         else 
//         {
//             list.tasks.push({
//                 taskName: input.value.trim(),
//                 taskDescription: taskDescription.value.trim(),
//                 deadline: deadlineInput.value,
//                 completed: false,
//                 completionTime: null
//             });
//             updateListsInStorage(list.name, list.tasks);
//             displayTasks(list.tasks, ul, list.name);
//             input.value = '';
//             deadlineInput.value = '';
//         }
//     });

//     createTaskDiv.appendChild(input);
//     createTaskDiv.appendChild(taskDescription);
//     createTaskDiv.appendChild(deadlineInput);
//     createTaskDiv.appendChild(addTaskBtn);
//     card.appendChild(createTaskDiv);

//     // Task list
//     let ul = document.createElement('ul');
//     ul.className = 'task-list';
//     displayTasks(list.tasks, ul, list.name);
//     card.appendChild(ul);

//     listsContainer.appendChild(card);
// }
