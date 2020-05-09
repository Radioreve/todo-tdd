class TodoList {

    constructor({ todoItems = [] }) {
        this.todolist = todoItems
    }

    createItem = (id, newItem) => {
        let item = {id: id, value: newItem, status: "to-do", newValue: null}
        return item
    }

    addTodoItem = (item) => {
        let newItem = this.createItem(id, item)
        this.todolist.push(newItem)
        id++
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

    validateTodoItemById = (todoId) => {
        let itemToValidate = this.getTodoItemById(todoId)
        itemToValidate.status = "done"
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
        itemToSave.status = "edited"
        return this
    }

    editTodoItemById = (todoId) => {
        let itemToEdit = this.getTodoItemById(todoId)

        if (itemToEdit.newValue === null){
            itemToEdit.newValue = itemToEdit.value
        }
        return this
    }

    updateTodoItemById = (todoId) => {
        let itemToUpdate = this.getTodoItemById(todoId)
        let input = document.querySelector('input')
        itemToUpdate.newValue = input.value
        return this
    }

    renderToDoItemAsHTMLString = (todoId) => {
        let itemToPutAsString = this.getTodoItemById(todoId)

        if (itemToPutAsString.newValue === itemToPutAsString.value){
            return `<div id='${itemToPutAsString.id}' data-status='${itemToPutAsString.status}'><input type="text" value="${itemToPutAsString.value}"></input></div>`

        }else if (itemToPutAsString.status === "edited"){
            return `<div class="flex" id='${itemToPutAsString.id}' data-status='${itemToPutAsString.status}'><p class="edited">${itemToPutAsString.value}</p></div>`

        }else if (itemToPutAsString.status === "to-do"){
            return `<div class="flex" id='${itemToPutAsString.id}' data-status='${itemToPutAsString.status}'><p>${itemToPutAsString.value}</p></div>`

        }else if (itemToPutAsString.status === "done"){
            return `<div class="flex" id='${itemToPutAsString.id}' data-status='${itemToPutAsString.status}'><p class="done">${itemToPutAsString.value}</p></div>`
        }

    }

    renderToDoItemsAsHTMLString = () => {
        let toDoItemsAsString = ''
        this.todolist.forEach((element, index) => {
            element = this.renderToDoItemAsHTMLString(index)
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