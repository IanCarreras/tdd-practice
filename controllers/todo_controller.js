const TodoModel = require('../models/todo_model')

exports.createTodo = () => {
    TodoModel.create()
}