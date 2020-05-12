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
        todoList.addTodoItem(input.value).refreshToDoDOM()
        input.value = ''
    }

    todoList.todolist.forEach(element => {
        let item = document.querySelector(`[data-id="${element.id}"]`)

        if (target === item.lastChild){
            const test = item.dataset.id
            console.log(test)

            /*if (test === element.id){
                todoList.removeTodoItemById(test)
                todoList.refreshToDoDOM()
            }*/
        }
    })

})
