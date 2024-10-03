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

export function showAddTaskDialog(USER)
{
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
    addTaskInput.placeholder = 'Add Task....';
    addTaskInput.className = 'modal-addTask-dialog-input';
    addTaskDiv.appendChild(addTaskInput);

    const addTaskDescriptionDiv = document.createElement('div');
    addTaskDescriptionDiv.className = 'modal-addTask-description-div';
    
    const addTaskDescriptionInput = document.createElement('input');
    addTaskDescriptionInput.className = 'modal-add-task-description-input';
    addTaskDescriptionInput.placeholder = 'Add Description...';
    addTaskDescriptionDiv.appendChild(addTaskDescriptionInput);

    const taskDeadlineDiv = document.createElement('div');
    taskDeadlineDiv.className = 'modal-task-deadline-div';

    const deadlinePicker = document.createElement('input');
    deadlinePicker.setAttribute('type', 'datetime-local');
    deadlinePicker.className = 'modal-deadline-input';
    taskDeadlineDiv.appendChild(deadlinePicker);

    overlayDiv.addEventListener('click', ()=>
        {
            const modal = document.querySelector('.add-task-modal.active');
            const overlay = document.querySelector('#overlay-div.active');

            modal.classList.remove('active');
            overlay.classList.remove('active');
            modal.remove();
            overlay.remove();
        })

    addTaskModalDiv.appendChild(addTaskDiv);
    addTaskModalDiv.appendChild(addTaskDescriptionDiv);
    addTaskModalDiv.appendChild(taskDeadlineDiv);

    body.appendChild(addTaskModalDiv);
    body.appendChild(overlayDiv);
}

function addTask(USER)
{
    let userLists = JSON.parse(localStorage.getItem(USER)) || []
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
}