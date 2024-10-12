export function createInbox(USER)
{
    const heading = document.createElement('h1');
    heading.className = 'inbox-heading';
    heading.textContent = 'Inbox';

    const userLists = localStorage.getItem(USER) || [];
    
}