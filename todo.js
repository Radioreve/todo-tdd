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
    let itemToCancel = todolist.find(element => element.id === todoId)
    itemToCancel.newValue = null
}

exports.saveTodoItemById = (todolist, todoId) => {
    let itemToSave = todolist.find(element => element.id === todoId)
    itemToSave.value = itemToSave.newValue
    itemToSave.newValue = null
}

exports.editTodoItemById = (todolist, todoId) => {
    let itemToEdit = todolist.find(element => element.id === todoId)

    if (itemToEdit.newValue === null){
        return itemToEdit.newValue = ''
    }
}

exports.updateTodoItemById = (todolist, todoId, newTask) => {
    let itemToUpdate = todolist.find(element => element.id === todoId)
    itemToUpdate.newValue = newTask
}

exports.renderToDoItemAsHTMLString = (todolist, todoId) => {
    let itemToPutAsString = todolist.find(element => element.id === todoId)
    return `<div id="${itemToPutAsString.id}" data-status="${itemToPutAsString.status}"><p>${itemToPutAsString.value}</p></div>`
}

exports.renderContainerAsHTMLString = (todoItem) => {
    return `<div class="liste">${todoItem}</div>`
}
