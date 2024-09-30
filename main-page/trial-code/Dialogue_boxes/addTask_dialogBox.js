export function createAddTaskDialog(USER) {
    let addTaskDiv = document.createElement('div');
    addTaskDiv.className = 'addTask-dialog-div';
    
    let addTaskInputDiv = document.createElement('div');
    addTaskInputDiv.className = 'addTask-input-div';

    let addTaskInput = document.createElement('input')
    addTaskInput.className = "addTask-input";

    let searchSpan = document.createElement('div');
    searchSpan.innerHTML = '<p>Search</p>'
    searchSpan.className = 'search-span';

    searchIconDiv.appendChild(searchIcon);
    searchDiv.appendChild(searchIconDiv)
    searchDiv.appendChild(searchSpan);

    return addTaskDiv;
}