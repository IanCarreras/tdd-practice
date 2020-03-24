const TodoController = require('../../controllers/todo_controller')
const TodoModel = require('../../models/todo_model')
const httpMocks = require('node-mocks-http')
const newTodo = require('../mock-data/new-todo.json')

TodoModel.create = jest.fn()

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = null
})

describe('todo controller creates todo', () => {
    it('should have create todo function', () => {
        expect(typeof TodoController.createTodo).toBe('function')
    })

    it('should call TodoModel.create', () => {
        req.body = newTodo
        TodoController.createTodo(req, res, next)

        expect(TodoModel.create).toBeCalledWith(newTodo)

    })
})