const TodoController = require('../../controllers/todo_controller')
const TodoModel = require('../../models/todo_model')

TodoModel.create = jest.fn()

describe('todo controller creates todo', () => {
    it('should have create todo function', () => {
        expect(typeof TodoController.createTodo).toBe('function')
    })

    it('should call TodoModel.create', () => {
        TodoController.createTodo()
        expect(TodoModel.create).toBeCalled()
    })
})