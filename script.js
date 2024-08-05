// script.js

let taskListArray = JSON.parse(localStorage.getItem('tasks')) || [];
let inputBox = document.getElementById('inputBox');
let taskList = document.getElementById('taskList');
let addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (inputBox.value.trim() === "") {
        alert('Task cannot be empty');
        return;
    }
    taskListArray.unshift({ id: Date.now(), task: inputBox.value });
    inputBox.value = "";
    saveTasks();
    layoutList();
});

function layoutList() {
    taskList.innerHTML = ''; // Clear the current list
    taskListArray.forEach(task => {
        let liElement = document.createElement('li');
        liElement.innerHTML = `${task.task} <button class="deleteBtn" data-id="${task.id}">Delete</button>`;
        taskList.appendChild(liElement);
    });
    attachEventListeners();
}

function attachEventListeners() {
    let deleteBtnList = document.getElementsByClassName('deleteBtn');
    for (let i = 0; i < deleteBtnList.length; i++) {
        deleteBtnList[i].addEventListener('click', (event) => {
            let taskId = event.target.getAttribute('data-id');
            deletetask(taskId);
        });
    }
}

function deletetask(taskId) {
    taskListArray = taskListArray.filter(task => task.id != taskId);
    saveTasks();
    layoutList();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(taskListArray));
}

// Initial rendering of the task list
layoutList();
