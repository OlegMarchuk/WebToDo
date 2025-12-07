let tasks = []

document.getElementById('addTaskBtn').addEventListener('click', () => {
    const name = document.getElementById('taskInput').value
    const category = document.getElementById('categorySelect').value
    if (name.trim() === '') return 

    tasks.push({
        name,
        category,
        isDone: false
    })
    document.getElementById('taskInput').value = '' 
    showTasks()
})

function showTasks(list=tasks) {
    let html = ''
    list.forEach((task, index) => {
        html += `
        <div class="task ${task.isDone ? 'done' : ''}">
            <span>${task.category} | ${task.name}</span>
            <div>
                <button onclick="toggleDone(${index})">${task.isDone ? 'Undo' : 'Done'}</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        </div>`
    })
    document.getElementById('taskList').innerHTML = html
}

function toggleDone(index) {
    tasks[index].isDone = !tasks[index].isDone
    showTasks()
}

function deleteTask(index) {
    tasks.splice(index, 1)
    showTasks()
}

function editTask(index) {
    const task = tasks[index]
    const newName = prompt('Enter new name', task.name)
    if (newName) tasks[index].name = newName
    showTasks()
}

function sortByCategory() {
    tasks.sort((a, b) => a.category.localeCompare(b.category))
    showTasks()
}

function filterTasks() {
    const cat = document.getElementById('filterCategory').value
    if (cat === '') showTasks()
    else showTasks(tasks.filter(t => t.category === cat))
}

showTasks()