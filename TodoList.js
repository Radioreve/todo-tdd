const TodoList = class TodoList {
  constructor({ todoItems = [] }) {
    this.todolist = todoItems
    this.nextId = todoItems.length + 1
  }

  addTodoItem = (item) => {
    let newItem = this._createItem(item)
    this.todolist.push(newItem)
    return newItem.id
  }

  _createItem = (newItem) => {
    let item = {
      id: this.nextId,
      value: newItem,
      status: "to-do",
      newValue: null,
    }
    this.nextId++
    return item
  }

  getTodoItemById = (todoId) => {
    return this.todolist.find((element) => element.id === todoId)
  }

  removeTodoItemById = (todoId) => {
    let indexOfItemToRemove = this.todolist.findIndex(
      (element) => element.id === todoId
    )
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

  editTodoItemById = (todoId, newValue) => {
    let itemToEdit = this.getTodoItemById(todoId)
    itemToEdit.newValue = newValue || itemToEdit.value
    return this
  }

  cancelTodoItemEditById = (todoId) => {
    let itemToCancel = this.getTodoItemById(todoId)
    itemToCancel.newValue = null
    return this
  }

  updateTodoItemById = (todoId, item) => {
    let itemToUpdate = this.getTodoItemById(todoId)
    itemToUpdate.value = item || itemToUpdate.newValue
    itemToUpdate.newValue = null
    itemToUpdate.status = "edited"
    return this
  }

  renderToDoItemsAsHTMLString = () => {
    let todo = this.todolist.filter(Boolean)
    let toDoItemsAsString = ""

    todo.forEach((element) => {
      if (element.newValue === element.value) {
        element = `<div class="grid" data-id='${element.id}' data-status='${element.status}'><i class="far fa-circle"></i><input class="edit" type="text" value="${element.value}"></input><div class="icones"><i class="fas fa-times"></i></div></div>`
      } else if (element.status === "edited") {
        element = `<div class="grid" data-id='${element.id}' data-status='${element.status}'><i class="far fa-circle"></i><p class="edited">${element.value}</p><div class="icones"><i class="fas fa-times"></i></div></div>`
      } else if (element.status === "done") {
        element = `<div class="grid" data-id='${element.id}' data-status='${element.status}'><i class="far fa-check-circle checked"></i><p class="done">${element.value}</p><div class="icones"><i class="fas fa-times"></i></div></div>`
      } else {
        element = `<div class="grid" data-id='${element.id}' data-status='${element.status}'><i class="far fa-circle"></i><p>${element.value}</p><div class="icones"><i class="fas fa-times"></i></div></div>`
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

if (!window || global) {
  module.exports = TodoList
}
