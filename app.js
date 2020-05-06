"use strict"

let todoItems
let todoList = new TodoList({todoItems})
let id = 0

let body = document.querySelector("body")
let input = document.querySelector("input")

body.addEventListener("click", function(e){
    e.stopPropagation()
    let target = e.target

    if (target === document.querySelector("#add")){
        todoList.addTodoItem(input.value)
        todoList.refreshToDoDOM()
        input.value = ''
    }

    let items = document.querySelectorAll("p")
    items.forEach((element, index) => {

        if (target === element){
            todoList.editTodoItemById(index)
            input.focus()
            input.value = element.innerText

            document.querySelector("#edit").addEventListener("click", function(e){
                e.stopPropagation()

                todoList.updateTodoItemById(index, input.value)
                todoList.saveTodoItemById(index)
                todoList.refreshToDoDOM()
                input.value = ''
            })
        }
    })
})