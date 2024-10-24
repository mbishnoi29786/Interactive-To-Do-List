
import { createListCard } from './ListCard.js';
import { updateUserLists, getUserLists } from './storage.js';

export function displayLists(USER, onRemoveList, onAddTask) {
    const userLists = getUserLists(USER);
    const listsContainer = document.getElementById('listsContainer');
    listsContainer.innerHTML = '';

    userLists.forEach(list => {
        const card = createListCard(list, USER, onRemoveList, onAddTask);
        listsContainer.appendChild(card);
    });
}
