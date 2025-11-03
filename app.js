document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Add placeholder text to the input field
    taskInput.placeholder = 'Enter a new task...';

    addTaskBtn.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskItem = createTaskElement(taskText);
            taskList.appendChild(taskItem);
            taskInput.value = '';
            saveTasks();
        } else {
            alert('Please enter a task.');
        }
    }

    function createTaskElement(taskText) {
        const task = document.createElement('div');
        task.className = 'task';
        task.innerHTML = `
            <span>${taskText}</span>
            <button class='deleteBtn'>Delete</button>
        `;

        const deleteBtn = task.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', () => {
            if (taskList.contains(task)) {
                taskList.removeChild(task);
                saveTasks();
            }
        });

        return task;
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task').forEach(task => {
            tasks.push(task.querySelector('span').textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            const taskItem = createTaskElement(taskText);
            taskList.appendChild(taskItem);
        });
    }

    loadTasks();
});