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

    renderToDoItemsAsHTMLString = () => {
        let todo = this.todolist.filter(Boolean)
        let toDoItemsAsString = ''

        todo.forEach(element => {

            if (element.newValue === element.value){
                element = `<div data-id='${element.id}' data-status='${element.status}'><input type="text" value="${element.value}"></input></div>`

            }else if (element.status === "edited"){
                element = `<div class="flex" data-id='${element.id}' data-status='${element.status}'><p class="edited">${element.value}</p><i class="fas fa-times"></i></div>`

            }else if (element.status === "done"){
                element = `<div class="flex" data-id='${element.id}' data-status='${element.status}'><p class="done">${element.value}</p><i class="fas fa-times"></i></div>`

            }else {
                element = `<div class="flex" data-id='${element.id}' data-status='${element.status}'><p>${element.value}</p><i class="fas fa-times"></i></div>`
            }

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