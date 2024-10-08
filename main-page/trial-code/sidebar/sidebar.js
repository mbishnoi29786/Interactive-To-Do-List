import { showAddTaskDialog } from "../Dialogue_boxes/addTask_dialogBox.js";
import { createSearchDiv, showSearchDialog } from "../Dialogue_boxes/search_dialogBox.js";


export function sideBarContents (USER)
{
    const sideBarMainDiv = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.textContent = 'My To Do List';
    const div = document.createElement('div');
    div.id = 'displayUsername';

    const addTaskDiv = addTaskDivFun(USER);
    const searchDiv = createSearchDiv(USER);
    searchDiv.addEventListener('click', () =>  showSearchDialog(USER));

    const listNameDiv = showListsNameOnSidebar(USER);

    sideBarMainDiv.appendChild(h2);
    sideBarMainDiv.appendChild(div);
    sideBarMainDiv.appendChild(addTaskDiv);
    sideBarMainDiv.appendChild(searchDiv);
    sideBarMainDiv.appendChild(listNameDiv);
    

    return sideBarMainDiv;
}

function addTaskDivFun(USER)
{
    const addTaskDiv = document.createElement('div');
    addTaskDiv.className = 'add-tasks-sideBar-div';

    const addTaskSymbolDiv = document.createElement('div');
    addTaskSymbolDiv.className = 'add-task-symbol-div';

    const addTaskSymbolSpan = document.createElement('span');
    addTaskSymbolSpan.textContent = '\u2295'
    addTaskSymbolSpan.className = 'add-task-symbol-span';
    addTaskSymbolDiv.appendChild(addTaskSymbolSpan);

    const addTaskContentDiv = document.createElement('div');
    addTaskContentDiv.className = 'add-task-content-div';
    addTaskContentDiv.textContent = 'Add Task';

    addTaskDiv.addEventListener('click', ()=> showAddTaskDialog(USER));
    addTaskDiv.appendChild(addTaskSymbolDiv);
    addTaskDiv.appendChild(addTaskContentDiv);

    return addTaskDiv;
}

function showListsNameOnSidebar (USER)
{
    const userLists = JSON.parse(localStorage.getItem(USER)) || [];

    const listNameDiv = document.createElement('div');
    const UL = document.createElement('ul');
    UL.className = 'sideBar-ul';

    const listHeading = document.createElement('lh');
    listHeading.textContent = 'MY LISTS';
    listHeading.className = 'sidebar-list-heading';
    UL.appendChild(listHeading);

    userLists.forEach(list => 
    {
        const li = document.createElement('li');
        li.className = 'sideBar-li';

        li.textContent = list.name;
        UL.appendChild(li);
    });

    listNameDiv.appendChild(UL);

    return listNameDiv;
}