exports.addTodoItem = (todolist, todoItem) => {
    return todolist.push(todoItem)
}

exports.getTodoItemById = (todolist, todoId) => {
    return todolist.find(element => element.id === todoId)
}

exports.removeTodoItemById = (todolist, todoId) => {
    return todolist.splice(todoId)
}

exports.cancelTodoItemEditById = (todolist, todoId) => {
    let itemToCancel = todolist.find(element => element.id === todoId)
    return itemToCancel.newValue = null
}

exports.saveTodoItemById = (todolist, todoId) => {
    let itemToSave = todolist.find(element => element.id === todoId)
    itemToSave.value = itemToSave.newValue
    return itemToSave.newValue = null
}

exports.editTodoItemById = (todolist, todoId) => {
    let itemToEdit = todolist.find(element => element.id === todoId)

    if (itemToEdit.newValue === null){
        return itemToEdit.newValue = ''
    }
}

exports.updateTodoItemById = (todolist, todoId, newTask) => {
    let itemToUpdate = todolist.find(element => element.id === todoId)
    return itemToUpdate.newValue = newTask
}