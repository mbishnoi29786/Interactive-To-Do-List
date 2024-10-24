import { createElement, createTextInput } from '../createElement/createElement.js';

export function createListCard(list, USER, onRemoveList, onAddTask) {
    const card = createElement('div', 'todo-card');

    const spanClose = createElement('SPAN', 'closeList', '', {'textContent': '\u00D7'});
    spanClose.addEventListener('click', () => onRemoveList(list.name));
    card.appendChild(spanClose);

    const h3 = createElement('h3', '', '', {'textContent': list.name});
    card.appendChild(h3);

    const createTaskDiv = createElement('div', 'create-task-div');
    const input = createTextInput('Add a new task...', 'task-input');
    const taskDescription = createTextInput('Add description', 'task-description');
    const { deadlinePicker, deadlineSpan } = createDeadlineInput();

    const addTaskBtn = createElement('span', 'addTaskBtn', 'Add');
    addTaskBtn.addEventListener('click', () => {
        const taskName = input.value.trim();
        const description = taskDescription.value.trim();
        const deadlineValue = deadlinePicker.value;
        onAddTask(taskName, description, deadlineValue);
        input.value = '';
        taskDescription.value = '';
    });

    createTaskDiv.appendChild(input);
    createTaskDiv.appendChild(taskDescription);
    createTaskDiv.appendChild(deadlinePicker);
    createTaskDiv.appendChild(deadlineSpan);
    createTaskDiv.appendChild(addTaskBtn);
    card.appendChild(createTaskDiv);

    return card;
}

// Create deadline input
function createDeadlineInput() {
    const deadlinePicker = createElement('input', 'deadline-input', '', { type: 'datetime-local' });
    const deadlineSpan = createElement('span', 'deadline-span', '', { textContent: 'Due Date' });

    deadlinePicker.addEventListener('input', () => {
        const selectedDate = new Date(deadlinePicker.value);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
        deadlineSpan.textContent = selectedDate.toLocaleString('en-US', options);
    });

    return { deadlinePicker, deadlineSpan };
}
