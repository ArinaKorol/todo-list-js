const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("taskList");
const todos = document.getElementById("todos-block");
const message = document.getElementById("message");
const themeToggle = document.getElementById('theme-toggle');
const searchInput = document.getElementById("search-input")

function searchTasks() {
    const searchText = searchInput.value.toLowerCase();
    const tasks = document.querySelectorAll('.item-task');
    
    tasks.forEach(task => {
        const taskText = task.querySelector('p').textContent.toLowerCase();
        
        if (taskText.includes(searchText)) {
            task.classList.remove('hidden');
        } else {
            task.classList.add('hidden');
        }
    })

    isEmpty();
}

function firstLetterToUpperCase(text){
    return text[0].toUpperCase() + text.slice(1);
}

function deleteTask(event) {
    if (event.target.dataset.action === "delete") {
        let taskToDelete = event.target.closest("li");
        taskToDelete.remove();
    }

    isEmpty()
}

function editTask(event) {
    if (event.target.dataset.action === "edit") {
        let taskToEdit = event.target.closest("li").querySelector("p")
        console.log(taskToEdit)
        let editText = prompt("Edit your task", taskToEdit.textContent);
        console.log(editText)
        taskToEdit.textContent = firstLetterToUpperCase(editText)
    }  
}

function changeTheme() {
    const currentTheme = document.body.className;
    const imgTheme = document.getElementById("theme-img")
    let srcTheme;
    if (currentTheme === 'light-theme') {
        document.body.className = 'dark-theme';
        srcTheme = "./images/tolighttheme.svg"
    } else {
        document.body.className = 'light-theme';
        srcTheme = "./images/todarktheme.svg"
    }
    imgTheme.src = srcTheme;
}

function isDone(event) {
    let doneTask = event.target.closest("li").querySelector("p");
    if (event.target.checked === true) {
        doneTask.style.textDecoration = " line-through";
    } else {
        doneTask.style.textDecoration = "none";
    }
}

function isEmpty() {
    const visibleTasks = document.querySelectorAll('.item-task:not(.hidden)');
    const noTasksMessage = document.querySelector('.message');
    if (visibleTasks.length == 0) {
        if (!noTasksMessage) {
            const message = document.createElement("p");
            message.textContent = "No tasks found";
            message.className = "message";
            todos.appendChild(message);
        }
    } else if (noTasksMessage) {
        noTasksMessage.remove();
    }
}

function createNewTask() {
    const userText = prompt("Enter your new task");
    if (!userText || userText.trim() === "") return;
    const taskHTML = createTaskHTML(firstLetterToUpperCase(userText));
    taskList.insertAdjacentHTML('beforeend', taskHTML);
    isEmpty();
}

function createTaskHTML(text) {
    return `
        <li class="item-task">
            <div class="item-task-text">
                <label class="item-task-label">
                    <input type="checkbox" onclick="isDone(event)">
                </label>
                <p>${text}</p>
            </div>
            <div class="task-btns">
                <button class="task-btn" data-action="delete">
                    <img src="./images/delete.svg" alt="Delete">
                </button>
                <button class="task-btn" data-action="edit">
                    <img src="./images/edit.svg" alt="Edit">
                </button>
            </div>
        </li>
    `;
}

taskList.addEventListener('click', deleteTask)
taskList.addEventListener("click", editTask)
themeToggle.addEventListener('click', changeTheme);
addBtn.addEventListener('click', createNewTask)
searchInput.addEventListener('input', searchTasks);

isEmpty()
