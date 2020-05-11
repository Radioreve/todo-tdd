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

    getTodoItemByIndex = (todoId) => {
        return this.todolist.find((element, index) => index === todoId)
    }

    removeTodoItemById = (todoId) => {
        let indexOfItemToRemove = this.todolist.findIndex((element, index) => index === todoId)
        this.todolist.splice(indexOfItemToRemove, 1)
        return this
    }

    validateTodoItemById = (todoId) => {
        let itemToValidate = this.getTodoItemByIndex(todoId)
        itemToValidate.status = "done"
        return this
    }

    cancelTodoItemEditById = (todoId) => {
        let itemToCancel = this.getTodoItemByIndex(todoId)
        itemToCancel.newValue = null
        return this
    }

    saveTodoItemById = (todoId) => {
        let itemToSave = this.getTodoItemByIndex(todoId)
        itemToSave.value = itemToSave.newValue
        itemToSave.newValue = null
        itemToSave.status = "edited"
        return this
    }

    editTodoItemById = (todoId) => {
        let itemToEdit = this.getTodoItemByIndex(todoId)

        if (itemToEdit.newValue === null){
            itemToEdit.newValue = itemToEdit.value
        }
        return this
    }

    updateTodoItemById = (todoId) => {
        let itemToUpdate = this.getTodoItemByIndex(todoId)
        let input = document.querySelector('input')
        itemToUpdate.newValue = input.value
        return this
    }

    renderToDoItemAsHTMLString = (todoId) => {
        let itemToPutAsString = this.getTodoItemByIndex(todoId)

        if (itemToPutAsString.newValue === itemToPutAsString.value){
            return `<div id='${itemToPutAsString.id}' data-status='${itemToPutAsString.status}'><input type="text" value="${itemToPutAsString.value}"></input></div>`

        }else if (itemToPutAsString.status === "edited"){
            return `<div id='${itemToPutAsString.id}' data-status='${itemToPutAsString.status}'><p class="edited">${itemToPutAsString.value}</p></div>`

        }else if (itemToPutAsString.status === "done"){
            return `<div id='${itemToPutAsString.id}' data-status='${itemToPutAsString.status}'><p class="done">${itemToPutAsString.value}</p></div>`

        }else {
            return `<div id='${itemToPutAsString.id}' data-status='${itemToPutAsString.status}'><p>${itemToPutAsString.value}</p></div>`
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

    renderTodoListAsHTMLString = (todoItems) => {
        return `<div class="liste">${todoItems}</div>`
    }

    refreshToDoDOM = () => {
        let todoItems = this.renderToDoItemsAsHTMLString()
        let todoList = this.renderTodoListAsHTMLString(todoItems)
        let container = document.querySelector(".container")
        container.innerHTML = todoList
        return this
    }
}