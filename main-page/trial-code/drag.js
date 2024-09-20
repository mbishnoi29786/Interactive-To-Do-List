
export function dragFunctionality ()
{
    const taskLists = document.querySelectorAll('.task');
    const todoContainers = document.querySelectorAll('.task-list');
    
    taskLists.forEach(taskList => 
    {
        taskList.addEventListener('dragstart', () => 
        {
            taskList.classList.add('dragging');
            console.log(taskList);
        })

        taskList.addEventListener('dragend', ()=>
        {
            taskList.classList.remove('dragging');
        })
    })

    todoContainers.forEach(todoContainer => 
    {
    todoContainer.addEventListener('dragover', (e)=>
        {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            todoContainer.appendChild(draggable);
        })
    })
}