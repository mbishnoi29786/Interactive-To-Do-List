export function createTaskElement(task, onRemoveTask, onCompleteTask) {
    const li = document.createElement('li');
    li.className = 'task';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => onCompleteTask(task));

    const spanClose = document.createElement('SPAN');
    spanClose.textContent = '\u00D7';
    spanClose.addEventListener('click', () => onRemoveTask(task.taskName));

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(task.taskName));
    li.appendChild(spanClose);

    return li;
}
