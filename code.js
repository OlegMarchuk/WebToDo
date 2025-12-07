let tasks = []
let draggedTaskIndex = null;

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
        <div class="task ${task.isDone ? 'done' : ''}" 
             draggable="true"
             ondragstart="dragStart(${index})">
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

function dragStart(index) {
    draggedTaskIndex = index;
    event.dataTransfer.setData('text/plain', index);
    event.dataTransfer.effectAllowed = 'move';
}

function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

function dragEnterList(event) {
    event.preventDefault();
    event.currentTarget.classList.add('list-drag-over');
}

function dragLeaveList(event) {
    event.currentTarget.classList.remove('list-drag-over');
}

function dropOnList(event, targetCategory) {
    event.preventDefault();
    event.currentTarget.classList.remove('list-drag-over');
    
    const sourceIndex = parseInt(event.dataTransfer.getData('text/plain'));
    
    if (sourceIndex !== null && tasks[sourceIndex].category !== targetCategory) {
        tasks[sourceIndex].category = targetCategory;
        showTasks();
    }
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
    const workSection = document.getElementById('taskListWork').parentElement
    const studySection = document.getElementById('taskListStudy').parentElement
    const homeSection = document.getElementById('taskListHome').parentElement
    
    workSection.style.display = 'none'
    studySection.style.display = 'none'
    homeSection.style.display = 'none'
    
    if (cat === '') {
        workSection.style.display = 'block'
        studySection.style.display = 'block'
        homeSection.style.display = 'block'
        showTasks(tasks)
    } else if (cat === 'Work' || cat === 'Study' || cat === 'Home') {
        if (cat === 'Work') {
            workSection.style.display = 'block'
            showTasks(tasks.filter(t => t.category === 'Work'))
        } else if (cat === 'Study') {
            studySection.style.display = 'block'
            showTasks(tasks.filter(t => t.category === 'Study'))
        } else if (cat === 'Home') {
            homeSection.style.display = 'block'
            showTasks(tasks.filter(t => t.category === 'Home'))
        }
    } else if (cat === 'done') {
        workSection.style.display = 'block'
        studySection.style.display = 'block'
        homeSection.style.display = 'block'
        showTasks(tasks.filter(t => t.isDone === true))
    } else if (cat === 'notDone') {
        workSection.style.display = 'block'
        studySection.style.display = 'block'
        homeSection.style.display = 'block'
        showTasks(tasks.filter(t => t.isDone === false))
    }
}

showTasks()