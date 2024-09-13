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
    // let searchKeyword = document.querySelector('.search-input').value.toLowerCase();

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
    const body = document.querySelector('body');

    const overlayDiv = document.createElement('div');
    overlayDiv.id = 'overlay-div';

    const searchModalDiv = document.createElement('div');
    searchModalDiv.className = 'search-modal';
    
    const searchModalHeader = document.createElement('div');
    searchModalHeader.className = 'search-modal-header';

    const searchIconDiv = document.createElement('div');
    searchIconDiv.className = 'search-icon-div';

    const searchIcon = document.createElement('img');
    searchIcon.setAttribute('src', '../../pictures/icons8-search-30.png');
    searchIcon.className = 'search-icon';

    const searchInputDiv = document.createElement('div');
    searchInputDiv.className = 'search-input-div';

    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.placeholder = 'Search or type a Command...';
    searchInput.className = 'search-input';

    const searchModalBody = document.createElement('div');
    searchModalBody.className = 'search-modal-body';
    

    searchIconDiv.appendChild(searchIcon);

    searchInputDiv.appendChild(searchInput);

    searchModalHeader.appendChild(searchIconDiv);
    searchModalHeader.appendChild(searchInputDiv);

    searchModalDiv.appendChild(searchModalHeader);
    searchModalDiv.appendChild(searchModalBody);

    body.appendChild(searchModalDiv);
    body.appendChild(overlayDiv);
}


// future implementation

// searchInput.addEventListener('input', filterTasks);


