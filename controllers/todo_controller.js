const TodoModel = require('../models/todo_model')

exports.createTodo = (req, res, next) => {
    TodoModel.create(req.body)
}