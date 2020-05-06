function _getTodoItemById(todolist, todoId){
    return todolist.find(element => element.id === todoId)
}

exports.addTodoItem = (todolist, todoItem) => {
    todolist.push(todoItem)
}

exports.getTodoItemById = (todolist, todoId) => {
    return todolist.find(element => element.id === todoId)
}

exports.removeTodoItemById = (todolist, todoId) => {
    let indexOfItemToRemove = todolist.findIndex(element => element.id === todoId)
    todolist.splice(indexOfItemToRemove, 1)
}

exports.cancelTodoItemEditById = (todolist, todoId) => {
    let itemToCancel = _getTodoItemById(todolist, todoId)
    itemToCancel.newValue = null
}

exports.saveTodoItemById = (todolist, todoId) => {
    let itemToSave = _getTodoItemById(todolist, todoId)
    itemToSave.value = itemToSave.newValue
    itemToSave.newValue = null
}

exports.editTodoItemById = (todolist, todoId) => {
    let itemToEdit = _getTodoItemById(todolist, todoId)

    if (itemToEdit.newValue === null){
        return itemToEdit.newValue = ''
    }
}

exports.updateTodoItemById = (todolist, todoId, newTask) => {
    let itemToUpdate = _getTodoItemById(todolist, todoId)
    itemToUpdate.newValue = newTask
}


exports.renderToDoItemAsHTMLString = (todolist, todoId) => {
    let itemToPutAsString = _getTodoItemById(todolist, todoId)
    return `<div id='${itemToPutAsString.id}' data-status='${itemToPutAsString.status}'><p>${itemToPutAsString.value}</p></div>`
}

exports.renderToDoItemsAsHTMLString = (todolist) => {
    let toDoItemsAsString = ''
    todolist.forEach(element => {
        element = `<div id='${element.id}' data-status='${element.status}'><p>${element.value}</p></div>`
        toDoItemsAsString += element
    })
    return toDoItemsAsString
}

exports.renderContainerAsHTMLString = (todoItem) => {
    return `<div class="liste">${todoItem}</div>`
}

exports.refreshToDoDOM = (todolist) => {
    let todoItems = renderToDoItemsAsHTMLString(todolist)
    let todoList = renderContainerAsHTMLString(todoItems)
    let container = document.querySelector(".container")
    container.innerHTML = todoList
}