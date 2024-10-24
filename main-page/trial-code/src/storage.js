export function getUserLists(USER) {
    return JSON.parse(localStorage.getItem(USER)) || [];
}

export function updateUserLists(USER, userLists) {
    localStorage.setItem(USER, JSON.stringify(userLists));
}

export function addNewList(USER, newList) {
    const userLists = getUserLists(USER);
    userLists.push(newList);
    updateUserLists(USER, userLists);
}

export function removeList(USER, listName) {
    let userLists = getUserLists(USER).filter(list => list.name !== listName);
    updateUserLists(USER, userLists);
}

export function updateTaskInList(USER, listName, updatedTasks) {
    const userLists = getUserLists(USER);
    const list = userLists.find(list => list.name === listName);
    if (list) {
        list.tasks = updatedTasks;
        updateUserLists(USER, userLists);
    }
}
