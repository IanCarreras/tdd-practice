const req = require('supertest')
const server = require('../../index')
const newTodo = require('../mock-data/new-todo.json')

const endpointUrl = '/todos/'

describe(endpointUrl, () => {
    it('POST ' + endpointUrl, async () => {
        const res = await req(server)
            .post(endpointUrl)
            .send(newTodo)
            expect(res.statusCode).toBe(201)
            expect(res.body.title).toBe(newTodo.title)
            expect(res.body.done).toBe(newTodo.done)
    })

    it('should return error 500 on malformed data with POST ' + endpointUrl, async () => {
        const res = await req(server)
            .post(endpointUrl)
            .send({ title: 'Missing done property'})
        
        expect(res.statusCode).toBe(500)
        expect(res.body).toStrictEqual({
            message: 'Todo validation failed: done: Path `done` is required.'
        })
    })
})