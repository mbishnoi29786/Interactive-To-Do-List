// search functionality

export function createSearchDiv(USER) {
    let searchDiv = document.createElement('div');
    searchDiv.className = 'search-div';
    searchDiv.setAttribute('data-modal-target', '.search-modal')
    
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

    return searchDiv;
}

export function showSearchDialog(USER) {   
    const body = document.querySelector('body');

    const overlayDiv = document.createElement('div');
    overlayDiv.id = 'overlay-div';
    overlayDiv.classList.add('active');

    const searchModalDiv = document.createElement('div');
    searchModalDiv.className = 'search-modal';
    searchModalDiv.classList.add('active');

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
    searchInput.addEventListener('input', () => filterTasks(USER));

    const searchModalBody = document.createElement('div');
    searchModalBody.className = 'search-modal-body';
    
    const searchResultsDiv = document.createElement('div');
    searchResultsDiv.className = 'search-results-div';

    searchModalBody.appendChild(searchResultsDiv);

    searchIconDiv.appendChild(searchIcon);
    searchInputDiv.appendChild(searchInput);
    searchModalHeader.appendChild(searchIconDiv);
    searchModalHeader.appendChild(searchInputDiv);
    searchModalDiv.appendChild(searchModalHeader);
    searchModalDiv.appendChild(searchModalBody);
    
    body.appendChild(overlayDiv);
    body.appendChild(searchModalDiv);

    // Focus trap implementation
    const focusableElements = searchModalDiv.querySelectorAll(
        'input, button, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    // Function to handle focus trap
    function trapFocus(event) {
        if (event.key === 'Tab') {
            if (event.shiftKey) { // Shift + Tab
                // If the first element is focused and user presses Shift + Tab
                if (document.activeElement === firstFocusableElement) {
                    event.preventDefault();
                    lastFocusableElement.focus(); // Focus the last element
                }
            } else { // Tab
                // If the last element is focused and user presses Tab
                if (document.activeElement === lastFocusableElement) {
                    event.preventDefault();
                    firstFocusableElement.focus(); // Focus the first element
                }
            }
        }
    }

    // Event listener to trap focus
    searchModalDiv.addEventListener('keydown', trapFocus);

    // Close modal on escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            overlayDiv.click(); // Trigger the overlay click event to close the modal
        }
    });

    // Close modal on overlay click
    overlayDiv.addEventListener('click', () => {
        searchModalDiv.classList.remove('active');
        overlayDiv.classList.remove('active');
        searchModalDiv.remove();
        overlayDiv.remove();
    });

    // Automatically focus the first input in the modal
    firstFocusableElement.focus();
}



function filterTasks(USER)
{
    console.log(USER);
    
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
    
    displayResult(filteredList)
}

function displayResult(filteredList) 
{
    
    const searchModalBody = document.querySelector('.search-modal-body');

    searchModalBody.innerHTML = '';

    if (filteredList.length == 0)
    {
        searchModalBody.innerHTML = 'NO Data Found!';
        return;
    }

    const modalList = document.createElement('ul');
    modalList.className = 'modal-list';

    filteredList.forEach(list => {
        const searchList = document.createElement('li');
        searchList.className = 'search-list';

        const listNameDiv = document.createElement('div');
        listNameDiv.className = 'search-list-name-div';
        listNameDiv.textContent = `LIST: ${list.name}`

        const allTasksDiv = document.createElement('div');
        allTasksDiv.className = 'search-all-tasks-div';

        const taskLists = document.createElement('ul');
        taskLists.className = 'search-lists-tasks-list'


        list.tasks.forEach(task =>
        {   
            const taskListItem = document.createElement('li');
            taskListItem.className = 'search-lists-tasks-list-item';
    
            const taskNameDiv = document.createElement('div');
            taskNameDiv.className = 'search-task-name';
            taskNameDiv.textContent = `TASK: ${task.taskName}`

            const taskDeadlineDiv = document.createElement('div');
            taskDeadlineDiv.className = 'search-task-deadline';
            taskDeadlineDiv.textContent = `DEADLINE: ${task.deadline}`;

            taskListItem.appendChild(taskNameDiv);
            taskListItem.appendChild(taskDeadlineDiv);

            taskLists.appendChild(taskListItem);
        })
        
        allTasksDiv.appendChild(taskLists);

        searchList.appendChild(listNameDiv);
        searchList.appendChild(allTasksDiv);

        modalList.appendChild(searchList);
    });

    searchModalBody.appendChild(modalList);

    console.log(searchModalBody);
    
}


