window.addEventListener('load', function(){
    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (!user)
    {
        window.location.href = '../login-page/user_login.html';
    }
    else
    {
        console.log(user);
    }
})

// Create a "close" button and append it to each list item
let myNodelist = document.getElementsByTagName("LI");

for (let i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
let close = document.getElementsByClassName("close");

for (let i = 0; i < close.length; i++) {
    close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
    }
}

// Add a "checked" symbol when clicking on a list item
let list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    }
}, false);

// Create a new list item when clicking on the "Add" button
const addTaskButton = document.querySelector('.addTaskBtn');
addTaskButton.addEventListener('click', newElement);
function newElement() 
{
    let li = document.createElement("li");
    let inputValue = document.getElementById("myInput").value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') 
    {
        alert("Write a task!");
    } 

    else if(inputValue.length < 3 || inputValue.length > 50)
    {
        alert("Task name should lie between 3 and 50!");
    }
    else 
    {
        document.getElementById("myUL").appendChild(li);
    }

    document.getElementById("myInput").value = "";

    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) 
    {
        close[i].onclick = function() 
        {
            let div = this.parentElement;
            div.style.display = "none";
        }
    }
}   