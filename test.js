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


const {
  addTodoItem,
  getTodoItemById,
  removeTodoItemById,
  cancelTodoItemEditById,
} = require("./todo")

let todoList
describe("TodoList", () => {
  // On réinitialise la valeur de todoItem avant chaque test
  beforeEach(() => {
    todoList = [
      {
        id: 3,
        value: "appeler le voisin",
        status: "to-do",
        newValue: null
      },
      { id: 1, value: "acheter des crocks", status: "to-do", newValue: "null" },
      { id: 2, value: "aller au cinéma", status: "to-do", newValue: null },
      { id: 4, value: "faire du sport", status: "done", newValue: null },
      { id: 5, value: "dormir un peu", status: "done", newValue: null },
    ]
  })

  describe("#getTodoItemById", () => {
    it("should get a todo item", () => {
      // when
      const todoItem = getTodoItemById(todoList, 2)

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
    it("should add a todo item", () => {
      // when
      const newTodoItem = {
        id: 42,
        value: "nouveau todo item",
        status: "to-do",
        newValue: null,
      }
      addTodoItem(todoList, newTodoItem)
      const addedTodoItem = getTodoItemById(todoList, 42)

      // then
      expect(addedTodoItem).toEqual(newTodoItem)
    })
  })

  describe("#removeTodoItemById", () => {
    it("should remove a todo item", () => {
      // when
      const todoItemAvantSuppression = getTodoItemById(todoList, 2)
      removeTodoItemById(todoList, 2)
      const todoItemAprèsSuppression = getTodoItemById(todoList, 2)

      // then
      expect(todoItemAvantSuppression).toBeTruthy()
      expect(todoItemAprèsSuppression).toEqual(undefined)
    })
  })

  describe("#cancelTodoItemEditById", () => {
    it("should cancel an ongoing edition", () => {
      // when
      // On doit cloner l'objet avec ... pour prendre une copie et pas la référence !
      const todoItemAvantAnnulationÉdition = { ...getTodoItemById(todoList, 3) }
      cancelTodoItemEditById(todoList, 3)
      const todoItemAprèsAnnulationÉdition = getTodoItemById(todoList, 3)

      expect(todoItemAvantAnnulationÉdition.newValue).toBeTruthy()
      expect(todoItemAprèsAnnulationÉdition.newValue).toEqual(null)
    })
  })

  describe("#saveTodoItemById", () => {
    it("should copy the new value into value and set new value to null", () => {
      // when

      //then

    })
  })

  describe("#editTodoItemById", () => {
    it("should set the new value to '' (and not null) when the new value is null", () => {
      // when

      //then

    })
  })

  describe("#updateTodoItemById", () => {
    it("should update the new value to a given new value in parameter", () => {
      // when

      //then

    })
  })

})