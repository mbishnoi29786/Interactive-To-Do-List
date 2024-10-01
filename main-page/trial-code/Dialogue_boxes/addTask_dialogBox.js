export function createAddTaskDialog(USER) {
    let addTaskDiv = document.createElement('div');
    addTaskDiv.className = 'addTask-dialog-div';
    
    let addTaskInputDiv = document.createElement('div');
    addTaskInputDiv.className = 'addTask-input-div';

    let addTaskInput = document.createElement('input')
    addTaskInput.className = "addTask-input";

    let searchSpan = document.createElement('div');
    searchSpan.innerHTML = '<p>Add</p>'
    searchSpan.className = 'search-span';

    searchSpan.addEventListener('click', ()=> addTask(USER));

    searchIconDiv.appendChild(searchIcon);
    searchDiv.appendChild(searchIconDiv)
    searchDiv.appendChild(searchSpan);

    return addTaskDiv;
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