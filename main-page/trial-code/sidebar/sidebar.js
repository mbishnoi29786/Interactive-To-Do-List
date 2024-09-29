import { createSearchDiv, showSearchDialog } from "../Search_functionality/search.js";


export function sideBarContents (USER)
{
    const sideBarMainDiv = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.textContent = 'My To Do List';
    const div = document.createElement('div');
    div.id = 'displayUsername';

    const addTaskDiv = addTaskDivFun();
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

function addTaskDivFun()
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