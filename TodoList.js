class TodoList {

    constructor({ todoItems = [] }) {
        this.todolist = todoItems
    }

    addTodoItem = (item) => {
        this.todolist.push(item)
        return this
    }

    getTodoItemById = (todoId) => {
        return this.todolist.find(element => element.id === todoId)
    }

    removeTodoItemById = (todoId) => {
        let indexOfItemToRemove = this.todolist.findIndex(element => element.id === todoId)
        this.todolist.splice(indexOfItemToRemove, 1)
        return this
    }

    cancelTodoItemEditById = (todoId) => {
        let itemToCancel = this.getTodoItemById(todoId)
        itemToCancel.newValue = null
        return this
    }

    saveTodoItemById = (todoId) => {
        let itemToSave = this.getTodoItemById(todoId)
        itemToSave.value = itemToSave.newValue
        itemToSave.newValue = null
        return this
    }

    editTodoItemById = (todoId) => {
        let itemToEdit = this.getTodoItemById(todoId)

        if (itemToEdit.newValue === null){
            itemToEdit.newValue = ''
        }
        return this
    }

    updateTodoItemById = (todoId, newTask) => {
        let itemToUpdate = this.getTodoItemById(todoId)
        itemToUpdate.newValue = newTask
        return this
    }

    renderToDoItemAsHTMLString = (todoId) => {
        let itemToPutAsString = this.getTodoItemById(todoId)
        return `<div id='${itemToPutAsString.id}' data-status='${itemToPutAsString.status}'><p>${itemToPutAsString.value}</p></div>`
    }

    renderToDoItemsAsHTMLString = () => {
        let toDoItemsAsString = ''
        this.todolist.forEach(element => {
            element = `<div id='${element.id}' data-status='${element.status}'><p>${element.value}</p></div>`
            toDoItemsAsString += element
        })
        return toDoItemsAsString
    }

    renderContainerAsHTMLString = (todoItems) => {
        return `<div class="liste">${todoItems}</div>`
    }

    refreshToDoDOM = () => {
        let todoItems = this.renderToDoItemsAsHTMLString()
        let todoList = this.renderContainerAsHTMLString(todoItems)
        let container = document.querySelector(".container")
        container.innerHTML = todoList
        return this
    }
}