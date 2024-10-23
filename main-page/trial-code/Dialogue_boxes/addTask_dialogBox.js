import {updateListsInStorage} from '../content/content.js'
import { createElement } from '../createElement/createElement.js';
import { validateTaskInput, createTextInput } from '../validation/addTaskValidation.js';

// Main function to show the Add Task dialog

export function showAddTaskDialog(USER) {

    const body = document.querySelector('body');
    const { overlayDiv, modalDiv } = createModal();

    // Create and append input fields for task name and description
    const addTaskDiv = createElement('div', 'modal-addTask-div');
    const addTaskInput = createTextInput('Add Task', 'modal-addTask-dialog-input');
    addTaskDiv.appendChild(addTaskInput);

    const addTaskDescriptionDiv = createElement('div', 'modal-addTask-description-div');
    const addTaskDescriptionInput = createTextInput('Add Description', 'modal-add-task-description-input');
    addTaskDescriptionDiv.appendChild(addTaskDescriptionInput);

    // Create and append the deadline input
    const { deadlinePicker, deadlineSpan } = createDeadlineInput();
    const taskDeadlineDiv = createElement('div', 'modal-task-deadline-div');
    taskDeadlineDiv.appendChild(deadlinePicker);
    taskDeadlineDiv.appendChild(deadlineSpan);

    // Show the date picker on clicking the deadline div
    taskDeadlineDiv.addEventListener('click', () => deadlinePicker.showPicker());

    // Create and populate the list selection dropdown
    const listSelect = createListSelect(USER);

    // Create the Add Task button and its functionality
    const addTaskButtonDiv = createElement('div', 'modal-add-task-button-div');
    const addTaskButton = createElement('button', 'modal-add-task-button', '', {'innerHTML': 'Add Task'});
    addTaskButton.addEventListener('click', () => handleAddTask(USER, listSelect.value, addTaskInput, deadlinePicker, addTaskDescriptionInput, deadlineSpan));
    addTaskButtonDiv.appendChild(addTaskButton);

    // Set up input listeners for enabling/disabling the button
    setupInputListeners(addTaskInput, addTaskButton);

    // Append all modal content 
    modalDiv.appendChild(addTaskDiv);
    modalDiv.appendChild(addTaskDescriptionDiv);
    modalDiv.appendChild(taskDeadlineDiv);
    modalDiv.appendChild(listSelect);
    modalDiv.appendChild(addTaskButtonDiv);

    // Append the modal and overlay to the body
    body.appendChild(overlayDiv);
    body.appendChild(modalDiv);

    // Set up close modal functionality
    setupModalClose(overlayDiv, modalDiv);

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
        modalDiv.classList.remove('active');
        modalDiv.classList.remove('active');
        modalDiv.remove();
        modalDiv.remove();
    });

    let {firstFocusableElement, lastFocusableElement} = trapFocus(modalDiv);
    
    firstFocusableElement.focus(); // Automatically focus the first input in the modal
}


function createModal() {
    const overlayDiv = createElement('div', 'overlay-div', 'overlay-div');
    overlayDiv.classList.add('active');

    const modalDiv = createElement('div', 'add-task-modal');
    modalDiv.classList.add('active');

    return { overlayDiv, modalDiv };
}

// Function to handle adding a task
function handleAddTask(USER, listChosen, addTaskInput, deadlinePicker, addTaskDescriptionInput, deadlineSpan) {
    const taskData = createTaskData(addTaskInput, deadlinePicker, addTaskDescriptionInput);
    if (addTask(USER, listChosen, taskData)) {
        // Clear inputs upon successful addition
        addTaskInput.value = '';
        deadlinePicker.value = '';
        deadlineSpan.textContent = "Due Date";
        addTaskDescriptionInput.value = '';
    }
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

function createDeadlineInput() {
    const deadlinePicker = createElement('input', 'modal-deadline-input', '', { type: 'datetime-local' });
    const deadlineSpan = createElement('span', 'modal-deadline-span', '', { textContent: 'Due Date' });
    
    // Event listener to update the deadline span
    deadlinePicker.addEventListener('input', () => {
        const selectedDate = new Date(deadlinePicker.value);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
        deadlineSpan.textContent = selectedDate.toLocaleString('en-US', options);
    });

    return { deadlinePicker, deadlineSpan };
}

function createListSelect(USER) {
    const listSelect = createElement('select', 'modal-list-select');
    const userLists = JSON.parse(localStorage.getItem(USER)) || [];

    userLists.forEach(list => {
        const option = createElement('option', '', '', { textContent: list.name });
        listSelect.appendChild(option);
    });

    return listSelect;
}

function createTaskData(addTaskInput, deadlinePicker, addTaskDescriptionInput) 
{
    return {
        input: addTaskInput.value,
        deadlineInput: deadlinePicker.value,
        taskDescription: addTaskDescriptionInput.value,
    };
}