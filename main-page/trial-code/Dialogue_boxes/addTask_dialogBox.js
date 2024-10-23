import {updateListsInStorage} from '../content/content.js'
import { createElement } from '../createElement/createElement.js';
import { validateTaskInput } from '../validation/addTaskValidation.js';

export function showAddTaskDialog(USER) {
    const body = document.querySelector('body');

    const overlayDiv = createElement('div', 'overlay-div', 'overlay-div');
    overlayDiv.classList.add('active');

    const addTaskModalDiv = createElement('div', 'add-task-modal');
    addTaskModalDiv.classList.add('active');

    const addTaskDiv = createElement('div', 'modal-addTask-div');

    const addTaskInput = createElement('input', 'modal-addTask-dialog-input', '', {'type' : 'text', 'placeholder' : 'Add Task'});

    addTaskDiv.appendChild(addTaskInput);

    const addTaskDescriptionDiv = createElement('div', 'modal-addTask-description-div');
    
    const addTaskDescriptionInput = createElement('input', 'modal-add-task-description-input', '', {'placeholder' : 'Add Description'});
    addTaskDescriptionDiv.appendChild(addTaskDescriptionInput);

    const taskDeadlineDiv = createElement('div', 'modal-task-deadline-div');

    const deadlinePicker = createElement('input', 'modal-deadline-input', '', {'type' : 'datetime-local'});

    const deadlineSpan = createElement('span', 'modal-deadline-span', '' , {'textContent' : 'Due Date'});

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

    
    const listSelect = createElement('select', 'modal-list-select');

    const userLists = JSON.parse(localStorage.getItem(USER)) || [];
    
    userLists.forEach(list => 
    {
        const option = createElement('option', '', '', {'textContent' : list.name});
        listSelect.appendChild(option);
    })

    const addTaskButtonDiv = createElement('div', 'modal-add-task-button-div');

    const addTaskButton = createElement('button', 'modal-add-task-button', '', {'innerHTML': 'Add Task'});
    
    addTaskButton.addEventListener('click', () => 
    {
        const taskData = 
        {
            input: addTaskInput.value,
            deadlineInput: deadlinePicker.value,
            taskDescription: addTaskDescriptionInput.value
        };
        let taskAdded = addTask(USER, listSelect.value, taskData);

        if (taskAdded)
        {
            addTaskInput.value = '';
            deadlinePicker.value = '';
            deadlineSpan.textContent = "Due Date"
            addTaskDescriptionInput.value = '';
        }
        
    });
    addTaskButtonDiv.appendChild(addTaskButton);

    setupInputListeners(addTaskInput, addTaskButton);

    // Append all modal content before calculating focusable elements
    addTaskModalDiv.appendChild(addTaskDiv);
    addTaskModalDiv.appendChild(addTaskDescriptionDiv);
    addTaskModalDiv.appendChild(taskDeadlineDiv);
    addTaskModalDiv.appendChild(listSelect);
    addTaskModalDiv.appendChild(addTaskButtonDiv);

    body.appendChild(overlayDiv);
    body.appendChild(addTaskModalDiv);

    // Close modal on escape
    document.addEventListener('keydown', (event) => 
    {
        if (event.key === 'Escape') 
        {
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

    let {firstFocusableElement, lastFocusableElement} = trapFocus(addTaskModalDiv);
    // Automatically focus the first input in the modal
    firstFocusableElement.focus();
}

function addTask(USER, listChosen, taskData)
{
    const { input, deadlineInput, taskDescription } = taskData;
    console.log(input, deadlineInput, taskDescription, taskData);
    

    let userLists = JSON.parse(localStorage.getItem(USER)) || [];
    const list = userLists.find(list => list.name === listChosen);
    
    if (!list) return false; // if list doesn't exist

    const isValid  = validateTaskInput(input, list.tasks, deadlineInput);

    if(!isValid) return false

    list.tasks.push(
    {
        taskName: input.trim(),
        taskDescription: taskDescription,
        deadline: deadlineInput,
        completed: false
    });
    updateListsInStorage(list.name, list.tasks, USER);
    alert("Task Added!!")
    // displayTasks(list.tasks, ul, list.name);
    return true;

}

function setupInputListeners(addTaskInput, addTaskButton) {
    addTaskInput.addEventListener('input', () => {
        if (addTaskInput.value === '') {
            addTaskButton.classList.remove('active');
        } else {
            addTaskButton.classList.add('active');
        }
    });
}


function createInput(placeholder, type = 'text', id) {
    return createElement('input', '',  `${id}-input`, { type, placeholder });
}

// Function to handle focus trap
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'input, button, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (event)=>
    {
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
    })
    
    return { firstFocusableElement, lastFocusableElement };
}