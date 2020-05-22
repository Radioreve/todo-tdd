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

    })
  })

  describe("#saveTodoItemById", () => {
    it("should copy the new value into value and set new value to null", () => {

    })
  })

  describe("#updateTodoItemById", () => {
    it("should update the new value to a given new value in parameter", () => {

    })
  })

  describe("#renderToDoItemAsHTMLString", () => {
    it("should return item into HTMLString", () => {
      //when
      const itemAsString = todoList.renderToDoItemAsHTMLString(3)

      //then
      expect(itemAsString).toEqual(
        "<div id='3' data-status='to-do'><p>appeler le voisin</p></div>"
      )
    })
  })
})
