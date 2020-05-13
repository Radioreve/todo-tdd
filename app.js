"use strict"

let todoItems
let todoList = new TodoList({todoItems})
let id = 0
let body = document.querySelector("body")
let input = document.querySelector("#new")

body.addEventListener("click", function(e){
    e.stopPropagation()
    let target = e.target

    if (target === document.querySelector("#add")){

        if (input.value !== ''){
            todoList.addTodoItem(input.value).refreshToDoDOM()
            input.value = ''
        }else{
            alert("Task cannot be empty")
        }
    }

    todoList.todolist.forEach(element => {
        let item = document.querySelector(`[data-id="${element.id}"]`)
        let parts = document.querySelector(`[data-id="${element.id}"] > .icones`).children
        const test = item.dataset.id

        if (target === parts[2]){

            if (Number(test) === element.id){
                todoList.removeTodoItemById(Number(test))
                todoList.refreshToDoDOM()
            }

        }else if (parts[1].classList.contains("fa-check-circle")){

            if (target === parts[1]) {

                if (Number(test) === element.id) {
                    todoList.invalidateTodoItemById(Number(test))
                    todoList.refreshToDoDOM()
                }
            }

        }else if (target === parts[1]){

            if (Number(test) === element.id){
                todoList.validateTodoItemById(Number(test))
                todoList.refreshToDoDOM()
            }

        }else if (parts[0].classList.contains("fa-check")){

            if (target === parts[0]) {

                if (Number(test) === element.id) {
                    todoList.updateTodoItemById(Number(test))
                    todoList.saveTodoItemById(Number(test))
                    todoList.refreshToDoDOM()
                }
            }

        }else if (target === parts[0]){

            if (Number(test) === element.id){
                todoList.editTodoItemById(Number(test))
                todoList.refreshToDoDOM()
            }
        }
    })
})