// search functionality

export function createSearchDiv() {
    let searchDiv = document.createElement('div');
    searchDiv.className = 'search-div';

    let searchIconDiv = document.createElement('div')
    let searchIcon = document.createElement('img');
    searchIcon.setAttribute('src', '../../pictures/icons8-search-30.png');
    searchIcon.className = "search-icon";

    let searchSpan = document.createElement('div');
    searchSpan.innerHTML = '<p>Search</p>'
    searchSpan.className = 'search-span';

    searchIconDiv.appendChild(searchIcon);
    searchDiv.appendChild(searchIconDiv)
    searchDiv.appendChild(searchSpan);

    searchDiv.addEventListener('click', showSearchDialog);
    return searchDiv;
}


export function filterTasks(USER)
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

    return filteredList;
    // displayLists(filteredList);
}

function showSearchDialog()
{
    const searchDialogDiv = document.createElement('div');
    searchDialogDiv.className = 'search-dialog-box';
    
    const searchBarDiv = document.createElement('div');
    searchBarDiv.className = 'search-bar-div';

    const searchIconDiv = document.createElement('div');
    searchIconDiv.className = 'search-icon-div';

    const searchIcon = document.createElement('img');
    searchIcon.setAttribute('src', '../../pictures/icons8-search-30.png');
    searchIcon.className = 'search-icon';

    let searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.placeholder = 'Search or type a Command...';
    searchInput.className = 'search-input';
    
}


// future implementation

// searchInput.addEventListener('input', filterTasks);


