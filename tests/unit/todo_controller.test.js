const TodoController = require('../../controllers/todo_controller')
const TodoModel = require('../../models/todo_model')
const httpMocks = require('node-mocks-http')
const newTodo = require('../mock-data/new-todo.json')
const allTodos = require('../mock-data/all-todos.json')

TodoModel.create = jest.fn()
TodoModel.find = jest.fn()
TodoModel.findById = jest.fn()

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

    it('should handle errors', async () => {
        const errorMessage = { message: 'todos not found' }
        const rejectedPromise = Promise.reject(errorMessage)
        
        TodoModel.find.mockReturnValue(rejectedPromise)
        await TodoController.getTodos(req, res, next)
        expect(next).toBeCalledWith(errorMessage)
    })
})

describe('todo controller get todo by id', () => {
    it('should have a get todo by id function', () => {
        expect(typeof TodoController.getTodoById).toBe('function')
    })

    it('should call TodoModel.find(id)', async () => {
        req.params.todoId = '5e7d3279ba37331feae78229'
        await TodoController.getTodoById(req, res, next)
        expect(TodoModel.findById).toBeCalledWith('5e7d3279ba37331feae78229')
    })

    it('should return json body and res code 200', async () => {
        TodoModel.findById.mockReturnValue(newTodo)
        await TodoController.getTodoById(req, res, next)
        expect(res.statusCode).toBe(200)
        expect(res._getJSONData()).toStrictEqual(newTodo)
        expect(res._isEndCalled()).toBeTruthy()
    })

    it('should handle errors', async () => {
        const errorMessage = { message: 'todo not found' }
        const rejectedPromise = Promise.reject(errorMessage)

        TodoModel.findById.mockReturnValue(rejectedPromise)
        await TodoController.getTodoById(req, res, next)
        expect(next).toHaveBeenCalledWith(errorMessage)
    })

    it('should return 404 when item doesnt exist', async () => {
        TodoModel.findById.mockReturnValue(null)
        await TodoController.getTodoById(req, res, next)
        expect(res.statusCode).toBe(404)
        expect(res._isEndCalled()).toBeTruthy()
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

    it('should handle errors', async () => {
        const errorMessage = { message: 'done property missing'}
        const rejectedPromise = Promise.reject(errorMessage)

        TodoModel.create.mockReturnValue(rejectedPromise)
        await TodoController.createTodo(req, res, next)
        expect(next).toBeCalledWith(errorMessage)
    })
})