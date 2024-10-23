// Search functionality

import { createElement, createTextInput } from "../createElement/createElement.js";
import { setupModalClose, trapFocus } from "./commonDialogFunctions.js";

export function createSearchDiv(USER) {
    let searchDiv = createElement('div', 'search-div', '', {'data-modal-target': '.search-modal'});
    
    let searchIconDiv = createElement('div')
    let searchIcon = createElement('img', "search-icon", '', {'src' : '../../pictures/icons8-search-30.png'});
    
    let searchSpan = createElement('div', 'search-span', 'search-span', {'innerHTML': '<p>Search</p>'});
    searchIconDiv.appendChild(searchIcon);
    searchDiv.appendChild(searchIconDiv)
    searchDiv.appendChild(searchSpan);

    return searchDiv;
}

export function showSearchDialog(USER) {   
    const body = document.querySelector('body');

    const { overlayDiv, searchModalDiv } = createModal();

    const searchModalHeader = createSearchModalHeader(USER);

    const searchModalBody = createElement('div', 'search-modal-body');
    
    const searchResultsDiv = createElement('div', 'search-results-div');
    searchModalBody.appendChild(searchResultsDiv);

    searchModalDiv.appendChild(searchModalHeader);
    searchModalDiv.appendChild(searchModalBody);
    
    body.appendChild(overlayDiv);
    body.appendChild(searchModalDiv);

    // Set up close modal functionality
    setupModalClose(overlayDiv, searchModalDiv);

    let {firstFocusableElement} = trapFocus(searchModalDiv);
    firstFocusableElement.focus(); // Automatically focus the first input in the modal
}

// Function to create modal elements
function createModal() {
    const overlayDiv = createElement('div', 'overlay-div', 'overlay-div');
    overlayDiv.classList.add('active');

    const searchModalDiv = createElement('div', 'search-modal');
    searchModalDiv.classList.add('active');

    return { overlayDiv, searchModalDiv };
}

// Function to create the header of the search modal
function createSearchModalHeader(USER) {
    const headerDiv = createElement('div', 'search-modal-header');

    const searchIconDiv = createElement('div', 'search-icon-div');
    const searchIcon = createElement('img', 'search-icon', '', { 'src': '../../pictures/icons8-search-30.png' });
    searchIconDiv.appendChild(searchIcon);

    const searchInputDiv = createElement('div', 'search-input-div');
    const searchInput = createTextInput('Search or type a Command...', 'search-input');
    searchInput.addEventListener('input', () => filterTasks(USER));

    searchInputDiv.appendChild(searchInput);
    headerDiv.appendChild(searchIconDiv);
    headerDiv.appendChild(searchInputDiv);

    return headerDiv;
}

function filterTasks(USER)
{    
    let searchKeyword = document.querySelector('.search-input').value.toLowerCase();

    const userLists = JSON.parse(localStorage.getItem(USER)) || [];

    // Filtered lists to include only those with matching tasks
    let filteredList = userLists.map(list => {

         // Filtered tasks in each list to include only those that match the search keyword
        let filteredTask = list.tasks.filter(task => 
            task.taskName.toLowerCase().includes(searchKeyword));
    
        // to return the list only if there are matching tasks
        return {
            ...list,
            tasks : filteredTask
        }

    }).filter(list => list.tasks.length > 0); // Excluded lists with no matching tasks
    
    displayResults(filteredList)
}

// Function to display the search results
function displayResults(filteredLists) {
    const searchModalBody = document.querySelector('.search-modal-body');
    searchModalBody.innerHTML = '';

    if (filteredLists.length === 0) {
        searchModalBody.innerHTML = 'NO Data Found!';
        return;
    }

    const modalList = createElement('ul', 'modal-list');
    
    filteredLists.forEach(list => {
        const searchListItem = createSearchListItem(list);
        modalList.appendChild(searchListItem);
    });

    searchModalBody.appendChild(modalList);    
}

// Function to create a list item for the search results
function createSearchListItem(list) {
    const searchList = createElement('li', 'search-list');

    const listNameDiv = createElement('div', 'search-list-name-div', '', { 'textContent': `LIST: ${list.name}` });
    const allTasksDiv = createElement('div', 'search-all-tasks-div');
    const taskList = createElement('ul', 'search-lists-tasks-list');

    list.tasks.forEach(task => {
        const taskListItem = createElement('li', 'search-lists-tasks-list-item');
        const taskNameDiv = createElement('div', 'search-task-name', '', { 'textContent': `TASK: ${task.taskName}` });
        const taskDeadlineDiv = createElement('div', 'search-task-deadline', '', { 'textContent': `DEADLINE: ${task.deadline}` });
        
        taskListItem.appendChild(taskNameDiv);
        taskListItem.appendChild(taskDeadlineDiv);
        taskList.appendChild(taskListItem);
    });

    allTasksDiv.appendChild(taskList);
    searchList.appendChild(listNameDiv);
    searchList.appendChild(allTasksDiv);

    return searchList;
}