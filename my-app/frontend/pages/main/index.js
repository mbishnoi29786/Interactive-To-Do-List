import { contentsMainDiv, showContents } from '../../components/content/content.js'
import {sideBarContents} from '../../components/sidebar/sidebar.js'

let USER;

window.addEventListener('load', function() {
    USER = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!USER) {
        window.location.href = '../login/login.html';
    } else {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === USER);
        const userLists = JSON.parse(localStorage.getItem(USER)) || [];

        const body = document.querySelector("body");

        const sideBarContentsDiv = sideBarContents(USER, user.username, userLists);
        const contentsDiv = contentsMainDiv(USER, userLists);

        body.appendChild(sideBarContentsDiv);
        body.appendChild(contentsDiv);

        showContents(USER, userLists)
    }
});


