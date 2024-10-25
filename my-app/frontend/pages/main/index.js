import { showContents } from '../../components/content/content.js'
import {sideBarContents} from '../../components/sidebar/sidebar.js'

let USER;

window.addEventListener('load', function() {
    USER = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!USER) {
        window.location.href = '../login/login.html';
    } else {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === USER);
        const sideBar = document.getElementById('sideBar');
        const sideBarContentsDiv = sideBarContents(USER);
        sideBar.appendChild(sideBarContentsDiv);
        document.getElementById('displayUsername').textContent = `Hello, ${user.username}!`;

        showContents(USER);
    }
});


