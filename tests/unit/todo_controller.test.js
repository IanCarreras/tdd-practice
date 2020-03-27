const TodoController = require('../../controllers/todo_controller')
const TodoModel = require('../../models/todo_model')
const httpMocks = require('node-mocks-http')
const newTodo = require('../mock-data/new-todo.json')
const allTodos = require('../mock-data/all-todos.json')

TodoModel.create = jest.fn()
TodoModel.find = jest.fn()

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = jest.fn()
})

describe('todo controller get todos', () => {
    it('should have a get todos function', () => {
        expect(typeof TodoController.getTodos).toBe('function')
    })

    it('should call TodoModel.find({})', async () => {
        await TodoController.getTodos(req, res, next)
        expect(TodoModel.find).toHaveBeenCalledWith({})
    })

    it('should return 200 response code and all todos', async () => {
        TodoModel.find.mockReturnValue(allTodos)
        await TodoController.getTodos(req, res, next)

        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled()).toBeTruthy()
        expect(res._getJSONData()).toStrictEqual(allTodos)
    })
})

describe('todo controller creates todo', () => {
    beforeEach(() => {
        req.body = newTodo
    })

    it('should have create todo function', () => {
        expect(typeof TodoController.createTodo).toBe('function')
    })

    it('should call TodoModel.create', () => {
        TodoController.createTodo(req, res, next)

        expect(TodoModel.create).toBeCalledWith(newTodo)
    })

    it('should return 201 response code', async () => {
        await TodoController.createTodo(req, res, next)

        expect(res.statusCode).toBe(201)
        expect(res._isEndCalled()).toBeTruthy()
    })

    it('should return json body in response', async () => {
        TodoModel.create.mockReturnValue(newTodo)
        await TodoController.createTodo(req, res, next)

        expect(res._getJSONData()).toStrictEqual(newTodo)
    })

    it('should hande errors', async () => {
        const errorMessage = { message: 'done property missing'}
        const rejectedPromise = Promise.reject(errorMessage)

        TodoModel.create.mockReturnValue(rejectedPromise)
        await TodoController.createTodo(req, res, next)

        expect(next).toBeCalledWith(errorMessage)
    })
})