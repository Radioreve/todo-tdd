"use strict"

let todoItems
let todoList = new TodoList({todoItems})
let id = 0
let body = document.querySelector("body")
let input = document.querySelector("#new")

body.addEventListener("keydown", function(e){
    e.stopPropagation()

    if (e.key === "Enter"){

        if (input.value !== ''){
            todoList.addTodoItem(input.value).refreshToDoDOM()
            input.value = ''
        }
    }

    todoList.todolist.forEach(element => {
        let item = document.querySelector(`[data-id="${element.id}"]`)
        const test = item.dataset.id
        const status = item.dataset.status

        if (status === "inProgress" && e.key === "Enter"){

            if (Number(test) === element.id) {
                todoList.updateTodoItemById(Number(test))
                todoList.saveTodoItemById(Number(test))
                todoList.refreshToDoDOM()
            }
        }
    })
})


body.addEventListener("dblclick", function(e){
    e.stopPropagation()

    todoList.todolist.forEach(element => {
        let item = document.querySelector(`[data-id="${element.id}"]`)
        let text = document.querySelector(`[data-id="${element.id}"] > p`)
        const test = item.dataset.id

        if (e.target === text){

            if (Number(test) === element.id) {
                todoList.editTodoItemById(Number(test))
                todoList.refreshToDoDOM()
            }
        }
    })
})



body.addEventListener("click", function(e){
    e.stopPropagation()
    let target = e.target

    todoList.todolist.forEach(element => {
        let item = document.querySelector(`[data-id="${element.id}"]`)
        let check = document.querySelector(`[data-id="${element.id}"]`).children
        let parts = document.querySelector(`[data-id="${element.id}"] > .icones`).children
        const test = item.dataset.id

        if (target === parts[0]){

            if (Number(test) === element.id){
                todoList.removeTodoItemById(Number(test))
                todoList.refreshToDoDOM()
            }

        }else if (check[0].classList.contains("fa-check-circle")){

            if (target === check[0]) {

                if (Number(test) === element.id) {
                    todoList.invalidateTodoItemById(Number(test))
                    todoList.refreshToDoDOM()
                }
            }

        }else if (target === check[0]){

            if (Number(test) === element.id){
                todoList.validateTodoItemById(Number(test))
                todoList.refreshToDoDOM()
            }

        }
    })
})