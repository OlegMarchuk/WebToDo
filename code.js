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

function sortByStatus() {
    tasks.sort((a, b) => {
        return a.isDone === b.isDone ? 0 : a.isDone ? 1 : -1
    })
    showTasks()
}

function filterTasks() {
    const cat = document.getElementById('filterCategory').value
    
    if (cat === '') {
        document.getElementById('taskListWork').parentElement.style.display = 'block'
        document.getElementById('taskListStudy').parentElement.style.display = 'block'
        document.getElementById('taskListHome').parentElement.style.display = 'block'
        showTasks(tasks)
    } else {
        document.getElementById('taskListWork').parentElement.style.display = 'none'
        document.getElementById('taskListStudy').parentElement.style.display = 'none'
        document.getElementById('taskListHome').parentElement.style.display = 'none'
        
        if (cat === 'Work') {
            document.getElementById('taskListWork').parentElement.style.display = 'block'
            showTasks(tasks.filter(t => t.category === 'Work'))
        } else if (cat === 'Study') {
            document.getElementById('taskListStudy').parentElement.style.display = 'block'
            showTasks(tasks.filter(t => t.category === 'Study'))
        } else if (cat === 'Home') {
            document.getElementById('taskListHome').parentElement.style.display = 'block'
            showTasks(tasks.filter(t => t.category === 'Home'))
        }
    }
}

showTasks()