import { createSearchDiv, showSearchDialog } from "../Search_functionality/search.js";


export function sideBarContents (USER)
{
    const sideBarMainDiv = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.textContent = 'My To Do List';
    const div = document.createElement('div');
    div.id = 'displayUsername';

    const addTaskDiv = document.createElement('div');
    addTaskDiv.className = 'add-tasks-sideBar-div';

    const addTaskImgDiv = document.createElement('div');
    addTaskImgDiv.className = 'add-task-img-div';

    const addTaskImg = document.createElement('img');
    addTaskImg.className = 'add-task-img';
    addTaskImg.setAttribute('src', '../../../pictures/icons8-add-button-100.png');
    addTaskImgDiv.appendChild(addTaskImg);

    const addTaskContentDiv = document.createElement('div');
    addTaskContentDiv.className = 'add-task-content-div';
    addTaskContentDiv.textContent = 'Add Task';

    addTaskDiv.appendChild(addTaskImgDiv);
    addTaskDiv.appendChild(addTaskContentDiv);

    const searchDiv = createSearchDiv(USER);
    searchDiv.addEventListener('click', () =>  showSearchDialog(USER));

    const listNameDiv = showListsNameOnSidebar(USER);

    sideBarMainDiv.appendChild(h2);
    sideBarMainDiv.appendChild(addTaskDiv);
    sideBarMainDiv.appendChild(div);
    sideBarMainDiv.appendChild(searchDiv);
    sideBarMainDiv.appendChild(listNameDiv);
    

    return sideBarMainDiv;
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