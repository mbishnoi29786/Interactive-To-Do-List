import {updateListsInStorage} from '../content/content.js'

export function createAddTaskDialog(USER) {
    let addTaskDiv = document.createElement('div');
    addTaskDiv.className = 'addTask-dialog-div';
    
    let addTaskInputDiv = document.createElement('div');
    addTaskInputDiv.className = 'addTask-input-div';

    let addTaskInput = document.createElement('input')
    addTaskInput.className = "addTask-input";

    let Span = document.createElement('div');
    Span.innerHTML = '<p>Add</p>'
    Span.className = 'addTask-span';

    searchSpan.addEventListener('click', ()=> showAddTaskDialog(USER));

    searchIconDiv.appendChild(searchIcon);
    searchDiv.appendChild(searchIconDiv)
    searchDiv.appendChild(searchSpan);

    return addTaskDiv;
}

export function showAddTaskDialog(USER) {
    const body = document.querySelector('body');

    const overlayDiv = document.createElement('div');
    overlayDiv.id = 'overlay-div';
    overlayDiv.classList.add('active');

    const addTaskModalDiv = document.createElement('div');
    addTaskModalDiv.className = 'add-task-modal';
    addTaskModalDiv.classList.add('active');

    const addTaskDiv = document.createElement('div');
    addTaskDiv.className = 'modal-addTask-div';

    const addTaskInput = document.createElement('input');
    addTaskInput.setAttribute('type', 'text');
    addTaskInput.placeholder = 'Add Task';
    addTaskInput.className = 'modal-addTask-dialog-input';
    addTaskInput.addEventListener('input', ()=>{
        if (addTaskInput.value == '')
        {
            document.querySelector('.modal-add-task-button').classList.remove('active');
        }
        else
        {
            document.querySelector('.modal-add-task-button').classList.add('active');
        }
    })
    addTaskDiv.appendChild(addTaskInput);

    const addTaskDescriptionDiv = document.createElement('div');
    addTaskDescriptionDiv.className = 'modal-addTask-description-div';
    
    const addTaskDescriptionInput = document.createElement('input');
    addTaskDescriptionInput.className = 'modal-add-task-description-input';
    addTaskDescriptionInput.placeholder = 'Add Description';
    addTaskDescriptionDiv.appendChild(addTaskDescriptionInput);

    const taskDeadlineDiv = document.createElement('div');
    taskDeadlineDiv.className = 'modal-task-deadline-div';

    const deadlinePicker = document.createElement('input');
    deadlinePicker.setAttribute('type', 'datetime-local');
    deadlinePicker.className = 'modal-deadline-input';

    const deadlineSpan = document.createElement('span');
    deadlineSpan.className = 'modal-deadline-span';
    deadlineSpan.textContent = 'Due Date';

    taskDeadlineDiv.appendChild(deadlinePicker);
    taskDeadlineDiv.appendChild(deadlineSpan);

    // Set up the click listener for the deadline picker
    deadlinePicker.addEventListener('click', (event) => 
    {
        event.stopPropagation(); // Prevent the click from bubbling up
    });

    // Event listener for when the deadline is selected
    deadlinePicker.addEventListener('input', () => 
    {
        const selectedDate = new Date(deadlinePicker.value);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
        deadlineSpan.textContent = selectedDate.toLocaleString('en-US', options);
    });

    // Click event for the taskDeadlineDiv
    taskDeadlineDiv.addEventListener('click', () => {
        deadlinePicker.showPicker();
    });

    
    const listSelect = document.createElement('select');
    listSelect.className = 'modal-list-select';

    const userLists = JSON.parse(localStorage.getItem(USER)) || [];

    console.log(userLists);
    
    userLists.forEach(list => {
        const option = document.createElement("option");
        option.textContent = list.name;
        listSelect.appendChild(option);
    })

    const addTaskButtonDiv = document.createElement('div');
    addTaskButtonDiv.className = 'modal-add-task-button-div';

    const addTaskButton = document.createElement('button');
    addTaskButton.className = 'modal-add-task-button';
    addTaskButton.innerHTML = 'Add Task';
    addTaskButton.addEventListener('click', () => {
        let value = addTask(USER, listSelect.value, addTaskInput.value, deadlinePicker.value, addTaskDescriptionInput.value)
        if (value)
        {
            addTaskInput.value = '';
            deadlinePicker.value = '';
            deadlineSpan.textContent = "Due Date"
            addTaskDescriptionInput.value = '';
        }
        
    });
    addTaskButtonDiv.appendChild(addTaskButton);

    // Append all modal content before calculating focusable elements
    addTaskModalDiv.appendChild(addTaskDiv);
    addTaskModalDiv.appendChild(addTaskDescriptionDiv);
    addTaskModalDiv.appendChild(taskDeadlineDiv);
    addTaskModalDiv.appendChild(listSelect);
    addTaskModalDiv.appendChild(addTaskButtonDiv);

    body.appendChild(overlayDiv);
    body.appendChild(addTaskModalDiv);
    console.log("Modal and overlay appended.");

    // Focus trap implementation
    const focusableElements = addTaskModalDiv.querySelectorAll(
        'input, button, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    // Function to handle focus trap
    function trapFocus(event) {
        if (event.key === 'Tab') {
            if (event.shiftKey) { // Shift + Tab
                // If the first element is focused and user presses Shift + Tab
                if (document.activeElement === firstFocusableElement) {
                    event.preventDefault();
                    lastFocusableElement.focus(); // Focus the last element
                }
            } else { // Tab
                // If the last element is focused and user presses Tab
                if (document.activeElement === lastFocusableElement) {
                    event.preventDefault();
                    firstFocusableElement.focus(); // Focus the first element
                }
            }
        }
    }

    // Add event listeners to trap focus
    addTaskModalDiv.addEventListener('keydown', trapFocus);

    // Close modal on escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            overlayDiv.click(); // Trigger the overlay click event to close the modal
        }
    });

    // Close modal on overlay click
    overlayDiv.addEventListener('click', () => {
        addTaskModalDiv.classList.remove('active');
        overlayDiv.classList.remove('active');
        addTaskModalDiv.remove();
        overlayDiv.remove();
    });

    // Automatically focus the first input in the modal
    firstFocusableElement.focus();
}

function addTask(USER, listChosen, input, deadlineInput, taskDescription)
{
    let userLists = JSON.parse(localStorage.getItem(USER)) || []

    console.log(listChosen);

    const list = userLists.find(list => list.name === listChosen)
    
    console.log(list);
    
    let taskExist = list.tasks.find(tasks => tasks.taskName === input.trim());
        let deadlineValue = new Date(deadlineInput);
        let now = new Date();

        if (input.trim() === '') 
        {
            alert("Write a task!");
            return false;
        } 
        else if (taskExist) 
        {
            alert("Task Already Exists!!");
            return false;
        }
        else if (isNaN(deadlineValue))
        {
            alert("Enter a dealine!!");
            return false;
        } 
        else if (deadlineValue <= now) 
        {
            alert("Deadline must be in the future!");
            return false;
        } 
        else 
        {
            list.tasks.push({
                taskName: input.trim(),
                taskDescription: taskDescription,
                deadline: deadlineInput,
                completed: false
            });
            updateListsInStorage(list.name, list.tasks);
            // displayTasks(list.tasks, ul, list.name);
            return true
        }
}

