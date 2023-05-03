
//add task elements
const form=document.querySelector(".task-form")
const taskInput = document.querySelector(".task-input")
const addButton= document.querySelector("#add-btn")

// delete all task element
const deleteAll = document.querySelector("#clear-btn")

// list element
const taskList= document.querySelector(".task-list")

//alert messages
const messageTrue = document.querySelector(".message-true")
const messageFalse = document.querySelector(".message-false")

let tasksLocal=[]

run()

function run(){

    addButton.addEventListener("click", function(e){
        e.preventDefault()
        let inputText = taskInput.value

        if (inputText==null || inputText==""){
            alertMessageFalse()
        }else{
            addTaskToList(inputText)
            addTaskToLocalStorage(inputText)
            alertMessageTrue()
            taskInput.value=""
            inputText=taskInput.value

        }
    })

    document.addEventListener("DOMContentLoaded",whenPageLoaded)
    deleteAll.addEventListener("click",removeEverything)
}

function whenPageLoaded(){
    checkTasksLocalStorage()
    tasksLocal.forEach(function(task){
        addTaskToList(task)
    })
}

function addTaskToList(newToDo){

    let newTask = document.createElement("li")
    newTask.className="list-group-item "
    newTask.id="task-list-item"
    newTask.textContent= newToDo
    
    let clear = document.createElement("button")
    clear.className="clear"

    let icon= document.createElement("i")
    icon.className="fas fa-times clear-item"
    icon.id="clear-item"

    clear.appendChild(icon)
    taskList.appendChild(newTask).appendChild(clear)
    checkTasksLocalStorage()
}


function addTaskToLocalStorage(newToDo){

    checkTasksLocalStorage();
    
    tasksLocal.push(newToDo);
    localStorage.setItem("tasksLocal", JSON.stringify(tasksLocal));
}

function checkTasksLocalStorage(){
    
    tasksLocal=localStorage.getItem("tasksLocal")
    if(tasksLocal==null){
        tasksLocal=[]
    }else{
        tasksLocal=JSON.parse(localStorage.getItem("tasksLocal"))
    }
}

function alertMessageFalse(){
    messageFalse.classList.add("show")

    setTimeout(function() {
        messageFalse.classList.remove("show")
    }, 3000)
}

function alertMessageTrue(){
    messageTrue.classList.add("show")

    setTimeout(function() {
        messageTrue.classList.remove("show")
    }, 2000)
}

taskList.addEventListener("click", function(e){

    if(e.target.className==='fas fa-times clear-item'){
        const deleteToDo=e.target.parentElement.parentElement
        deleteToDo.remove()
        removeTaskFromLocalStorage(deleteToDo.textContent)
        e.preventDefault()
    }

})

function removeTaskFromLocalStorage(removeTask){
    checkTasksLocalStorage()
    tasksLocal.forEach(function(deleteToDo,index){
        if(removeTask===deleteToDo){
            tasksLocal.splice(index,1)
        }
    });
    localStorage.setItem("tasksLocal", JSON.stringify(tasksLocal))
}

function removeEverything(){

    const tasks = document.querySelectorAll(".list-group-item")
    tasks.forEach(function(deleteTasks){
        deleteTasks.remove()
    })
    tasksLocal=[];
    localStorage.setItem("tasksLocal",JSON.stringify(tasksLocal))
}
