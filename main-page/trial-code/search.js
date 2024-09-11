// search functionality

export function createSearchDiv() {
    let searchDiv = document.createElement('div');
    searchDiv.className = 'search-div';

    let searchSpan = document.createElement('SPAN');
    searchSpan.textContent = "\u2315 Search ";
    searchSpan.className = 'search-span';

    let searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.className = 'search-input';

    searchDiv.appendChild(searchSpan);
    searchDiv.appendChild(searchInput);

    searchInput.addEventListener('input', filterTasks);

    return searchDiv;
}


function filterTasks()
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

    displayLists(filteredList);
}


