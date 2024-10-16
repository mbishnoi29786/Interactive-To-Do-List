export function createInbox(USER)
{
    const heading = document.createElement('h1');
    heading.className = 'inbox-heading';
    heading.textContent = 'Inbox';

    const userLists = localStorage.getItem(USER) || [];
    const filtered_list = userLists.find(list=> list.listname == 'inbox');

    
}

function displayLists(lists) {
    const listsContainer = document.getElementById('listsContainer');

    listsContainer.innerHTML = '';
    lists.forEach(list => {
        createListCard(list);
    });
}