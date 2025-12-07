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
    document.getElementById('taskListWork').innerHTML = ''
    document.getElementById('taskListStudy').innerHTML = ''
    document.getElementById('taskListHome').innerHTML = ''
    
    list.forEach((task, index) => {
        const html = `
        <div class="task ${task.isDone ? 'done' : ''}">
            <span>${task.name}</span>
            <div>
                <button onclick="toggleDone(${index})">${task.isDone ? 'Undo' : 'Done'}</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        </div>`
        
        if (task.category === 'Work') {
            document.getElementById('taskListWork').innerHTML += html
        } else if (task.category === 'Study') {
            document.getElementById('taskListStudy').innerHTML += html
        } else if (task.category === 'Home') {
            document.getElementById('taskListHome').innerHTML += html
        }
    })
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
    if (cat === '') {
        showTasks()
    } else {
        document.getElementById('taskListWork').style.display = 'none'
        document.getElementById('taskListStudy').style.display = 'none'
        document.getElementById('taskListHome').style.display = 'none'
        
        if (cat === 'Work') {
            document.getElementById('taskListWork').style.display = 'block'
            showTasks(tasks.filter(t => t.category === 'Work'))
        } else if (cat === 'Study') {
            document.getElementById('taskListStudy').style.display = 'block'
            showTasks(tasks.filter(t => t.category === 'Study'))
        } else if (cat === 'Home') {
            document.getElementById('taskListHome').style.display = 'block'
            showTasks(tasks.filter(t => t.category === 'Home'))
        }
    }
}

showTasks()