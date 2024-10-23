import { createElement } from "../createElement/createElement.js";
import { showAddTaskDialog } from "../Dialogue_boxes/addTask_dialogBox.js";
import { createSearchDiv, showSearchDialog } from "../Dialogue_boxes/search_dialogBox.js";

export function sideBarContents (USER)
{
    const sideBarMainDiv = createElement("div","sideBarMainDiv");

    const h2 = createElement("h2", "my-to-do-list", "", {"textContent" : "My To Do List"});

    const usernameDisplyDiv = createElement('div', "", "displayUsername");


    const addTaskDiv = addTaskDivFun(USER);
    const searchDiv = createSearchDiv(USER);
    searchDiv.addEventListener('click', () =>  showSearchDialog(USER));

    const listNameDiv = showListsNameOnSidebar(USER);

    sideBarMainDiv.appendChild(h2);
    sideBarMainDiv.appendChild(usernameDisplyDiv);
    sideBarMainDiv.appendChild(addTaskDiv);
    sideBarMainDiv.appendChild(searchDiv);
    sideBarMainDiv.appendChild(listNameDiv);
    

    return sideBarMainDiv;
}

function addTaskDivFun(USER)
{
    const addTaskDiv = createElement("div", "add-tasks-sideBar-div");

    const addTaskSymbolDiv = createElement("div", "add-task-symbol-div");

    const addTaskSymbolSpan = createElement("span", "add-task-symbol-span", "", {"textContent" : "\u2295"});
    addTaskSymbolDiv.appendChild(addTaskSymbolSpan);

    const addTaskContentDiv = createElement("div", "add-task-content-div", "", {"textContent" : "Add Task"});

    addTaskDiv.addEventListener('click', ()=> showAddTaskDialog(USER));
    addTaskDiv.appendChild(addTaskSymbolDiv);
    addTaskDiv.appendChild(addTaskContentDiv);

    return addTaskDiv;
}

function showListsNameOnSidebar (USER)
{
    const userLists = JSON.parse(localStorage.getItem(USER)) || [];

    const listNameDiv = createElement("div");
    const UL = createElement('ul', "sideBar-ul");

    const listHeading = createElement('lh', "sidebar-list-heading", "", {"textContent" : "MY LISTS"});

    UL.appendChild(listHeading);

    userLists.forEach(list => 
    {
        const li = createElement("li", "sideBar-li", "", {"textContent" : list.name});
        
        UL.appendChild(li);
    });

    listNameDiv.appendChild(UL);

    return listNameDiv;
}