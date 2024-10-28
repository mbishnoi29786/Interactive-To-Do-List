import { createElement } from "../utils/element-utils.js";
import { showAddTaskDialog } from "../dialog-boxes/add-task/add-task-dialog-box.js";
import { showSearchDialog } from "../dialog-boxes/search/search-dialog-box.js";

export function sideBarContents (USER, username)
{
    const sideBarMainDiv = createElement("div","sideBarMainDiv", "sideBar");

    const h2 = createElement("h2", "my-to-do-list", "", {"textContent" : "My To Do List"});

    const usernameDisplyDiv = createElement('div', "", "displayUsername", {"textContent" : `Hello, ${username}`});


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

function createSearchDiv(USER) {
    let searchDiv = createElement('div', 'search-div', '', {'data-modal-target': '.search-modal'});
    
    let searchIconDiv = createElement('div')
    let searchIcon = createElement('img', "search-icon", '', {'src' : '../../assets/images/search-icon.png'});
    
    let searchSpan = createElement('div', 'search-span', 'search-span', {'innerHTML': '<p>Search</p>'});
    searchIconDiv.appendChild(searchIcon);
    searchDiv.appendChild(searchIconDiv)
    searchDiv.appendChild(searchSpan);

    return searchDiv;
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