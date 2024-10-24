
import { displayLists } from './List.js';
import { addNewList, getUserLists, removeList } from './storage.js';

const USER = 'user@example.com'; // Example user email

function init() {
    const userLists = getUserLists(USER);
    displayLists(USER, removeListHandler, addTaskHandler);
    
    document.getElementById('addListBtn').addEventListener('click', () => {
        const listNameInput = document.getElementById('listNameInput');
        const listName = listNameInput.value.trim();
        if (listName) {
            addNewList(USER, { name: listName, tasks: [] });
            displayLists(USER, removeListHandler, addTaskHandler);
            listNameInput.value = '';
        }
    });
}

function removeListHandler(listName) {
    removeList(USER, listName);
    displayLists(USER, removeListHandler, addTaskHandler);
}

function addTaskHandler(taskName, description, deadline) {
    // Handle adding a task here
}

init();
