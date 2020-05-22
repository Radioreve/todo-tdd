"use strict"

/*
 * This TodoList offers an API for
 * - Retrieval
 * - Addition
 * - Deletion
 * - Switch to edition
 * - Update value in edition
 * - Cancellation in edition
 * - Saving in edition
 * */

const TodoList = require("./TodoList")

let todoItems
let todoList

describe("TodoList", () => {
  // On réinitialise la valeur de todoItem avant chaque test
  beforeEach(() => {
    todoItems = [
      {
        id: 3,
        value: "appeler le voisin",
        status: "to-do",
        newValue: null,
      },
      { id: 1, value: "acheter des crocks", status: "to-do", newValue: null },
      { id: 2, value: "aller au cinéma", status: "to-do", newValue: null },
      { id: 4, value: "faire du sport", status: "done", newValue: null },
      { id: 5, value: "dormir un peu", status: "done", newValue: null },
    ]

    todoList = new TodoList({ todoItems })
  })

  describe("#getTodoItemById", () => {
    it("should get a todo item", () => {
      // when
      const todoItem = todoList.getTodoItemById(2)

      // then
      expect(todoItem).toEqual({
        id: 2,
        value: "aller au cinéma",
        status: "to-do",
        newValue: null,
      })
    })
  })

  describe("#addTodoItem", () => {
    it("should add a todo item with a status as 'to-do'", () => {
      // when
      const newTodoItemId = todoList.addTodoItem("nouveau todo item")
      const addedTodoItem = todoList.getTodoItemById(newTodoItemId)

      // then
      expect(addedTodoItem).toEqual({
        id: 6,
        value: "nouveau todo item",
        status: "to-do",
        newValue: null,
      })
    })
  })

  describe("#removeTodoItemById", () => {
    it("should remove a todo item", () => {
      // when
      const todoItemAvantSuppression = todoList.getTodoItemById(2)
      todoList.removeTodoItemById(2)
      const todoItemAprèsSuppression = todoList.getTodoItemById(2)

      // then
      expect(todoItemAvantSuppression).toBeTruthy()
      expect(todoItemAprèsSuppression).toEqual(undefined)
      expect(todoList.todolist).toHaveLength(4)
    })
  })

  describe("#editTodoItemById", () => {
    it("should set the new value to the current value to start editing by default",  () => {
      // when
      const valueAvantÉdition = todoList.getTodoItemById(5).value;
      todoList.editTodoItemById(5);
      const newValueAprèsÉdition = todoList.getTodoItemById(5).newValue;

      // then
      expect(newValueAprèsÉdition).toEqual(valueAvantÉdition);
    });
    it("should set the new value to the current value to start editing by default",  () => {
      // when
      const newValue = "aller chercher des croissants"
      todoList.editTodoItemById(5, newValue);

      // then
      expect(todoList.getTodoItemById(5).newValue).toEqual(newValue);
    });
  })

  describe("#cancelTodoItemEditById", () => {
    it("should cancel an ongoing edition", () => {
      //when
      const newValueAvantEdition = todoList.getTodoItemById(2)
      todoList.editTodoItemById(2, "Aller au cinéma")
      todoList.cancelTodoItemEditById(2)
      const newValueApresAnnulation = todoList.getTodoItemById(2)

      //then
      expect(newValueApresAnnulation.newValue).toEqual(newValueAvantEdition.newValue)
    })
  })



  describe("#updateTodoItemById", () => {
    it("should update the new value to a given new value in parameter", () => {
      //when
      const newValue = "Acheter du pain"
      todoList.editTodoItemById(3, newValue)
      todoList.updateTodoItemById(3)
      const valueApresUpdate = todoList.getTodoItemById(3)

      //then
      expect(valueApresUpdate.value).toEqual(newValue)
      expect(valueApresUpdate.newValue).toEqual(null)
    });

    it("should update the new value to a given new value in parameter", () => {
      //when
      todoList.editTodoItemById(3)
      todoList.updateTodoItemById(3, "Acheter du lait")
      const valueApresUpdate = todoList.getTodoItemById(3)

      //then
      expect(valueApresUpdate.value).toEqual("Acheter du lait")
      expect(valueApresUpdate.newValue).toEqual(null)
    })
  })

  describe("#renderToDoItemsAsHTMLString", () => {
    it("should return item into HTMLString", () => {
      //when
      const itemsAsString = todoList.renderToDoItemsAsHTMLString()

      //then
      expect(itemsAsString).toEqual(
          `<div class="grid" data-id='3' data-status='to-do'><i class="far fa-circle"></i><p>appeler le voisin</p><div class="icones"><i class="fas fa-times"></i></div></div><div class="grid" data-id='1' data-status='to-do'><i class="far fa-circle"></i><p>acheter des crocks</p><div class="icones"><i class="fas fa-times"></i></div></div><div class="grid" data-id='2' data-status='to-do'><i class="far fa-circle"></i><p>aller au cinéma</p><div class="icones"><i class="fas fa-times"></i></div></div><div class="grid" data-id='4' data-status='done'><i class="far fa-check-circle checked"></i><p class="done">faire du sport</p><div class="icones"><i class="fas fa-times"></i></div></div><div class="grid" data-id='5' data-status='done'><i class="far fa-check-circle checked"></i><p class="done">dormir un peu</p><div class="icones"><i class="fas fa-times"></i></div></div>`
      )
    })
  })
})
