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


    invalidateTodoItemById = (todoId) => {
        let itemToInvalidate = this.getTodoItemById(todoId)
        itemToInvalidate.status = "to-do"
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

    updateTodoItemById = (todoId, item) => {
        let itemToUpdate = this.getTodoItemById(todoId)
        let inputEdit = document.querySelector('.edit')
        itemToUpdate.newValue = inputEdit.value
        return this
    }

    renderToDoItemsAsHTMLString = () => {
        let todo = this.todolist.filter(Boolean)
        let toDoItemsAsString = ''

        todo.forEach(element => {

            if (element.newValue === element.value){
                element = `<div class="grid" data-id='${element.id}' data-status='${element.status}'><input class="edit" type="text" value="${element.value}"></input><div class="icones"><i class="fas fa-check" style="color: lightcoral"></i><i class="far fa-circle"></i><i class="fas fa-times"></i></div></div>`

            }else if (element.status === "edited"){
                element = `<div class="grid" data-id='${element.id}' data-status='${element.status}'><p class="edited">${element.value}</p><div class="icones"><i class="fas fa-pen-fancy" style="color: lightcoral"></i><i class="far fa-circle"></i><i class="fas fa-times"></i></div></div>`

            }else if (element.status === "done"){
                element = `<div class="grid" data-id='${element.id}' data-status='${element.status}'><p class="done">${element.value}</p><div class="icones"><i class="fas fa-pen-fancy" style="color: lightcoral"></i><i class="fas fa-check-circle checked"></i><i class="fas fa-times"></i></div></div>`

            }else {
                element = `<div class="grid" data-id='${element.id}' data-status='${element.status}'><p>${element.value}</p><div class="icones"><i class="fas fa-pen-fancy" style="color: lightcoral"></i><i class="far fa-circle"></i><i class="fas fa-times"></i></div></div>`
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

//<div class="icones"><i class="fas fa-pen-fancy"></i><i class="far fa-circle"></i><i class="fas fa-times"></i></div>