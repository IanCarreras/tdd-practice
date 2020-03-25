const req = require('supertest')
const app = require('../../app')
const newTodo = require('../mock-data/new-todo.json')

const endpointUrl = '/todos/'

describe(endpointUrl, () => {
    it('POST ' + endpointUrl, () => {
        const res = await req(app)
            .post(endpointUrl)
            .send(newTodo)
            expect(res.statusCode).toBe(201)
            expect(res.body.title).toBe(newTodo.title)
            expect(res.body.done).toBe(newTodo.done)
    })
})