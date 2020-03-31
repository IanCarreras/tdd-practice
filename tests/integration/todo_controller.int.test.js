const req = require('supertest')
const server = require('../../index')
const newTodo = require('../mock-data/new-todo.json')

const endpointUrl = '/todos/'

let firstTodo, newTodoId
const nonExistingTodoId = '523d17c38e59d721665e7ff5'
const testData = { title: 'make integration test', done: true}

describe(endpointUrl, () => {
    it('GET ' + endpointUrl, async () => {
        const res = await req(server).get(endpointUrl)

        expect(res.statusCode).toBe(200)
        expect(Array.isArray(res.body)).toBeTruthy()
        expect(res.body[0].title).toBeDefined()
        expect(res.body[0].done).toBeDefined()
        firstTodo = res.body[0]
    })

    it('GET by Id ' + endpointUrl + ':todoId', async () => {
        const res = await req(server).get(endpointUrl + firstTodo._id)
        expect(res.statusCode).toBe(200)
        expect(res.body.title).toBe(firstTodo.title)
        expect(res.body.done).toBe(firstTodo.done)
    })

    it('GET todoById doesnt exist' + endpointUrl + ':todoId', async () => {
        const res = await req(server).get(endpointUrl + nonExistingTodoId)
        expect(res.statusCode).toBe(404)
    })

    it('POST ' + endpointUrl, async () => {
        const res = await req(server)
            .post(endpointUrl)
            .send(newTodo)
        expect(res.statusCode).toBe(201)
        expect(res.body.title).toBe(newTodo.title)
        expect(res.body.done).toBe(newTodo.done)
        newTodoId = res.body._id
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

    it('PUT ' + endpointUrl, async () => {
        const res = await(req(server))
            .put(endpointUrl + newTodoId)
            .send(testData)
        expect(res.statusCode).toBe(200)
        expect(res.body.title).toBe(testData.title)
        expect(res.body.done).toBe(testData.done)
    })

    it('DELETE ', async () => {
        const res = await req(server)
            .delete(endpointUrl + newTodoId)
            .send()
        expect(res.statusCode).toBe(200)
        expect(res.body.title).toBe(testData.title)
        expect(res.body.done).toBe(testData.done)
    })

    it('DELETE 404', async () => {
        const res = await req(server)
            .delete(endpointUrl + nonExistingTodoId)
            .send()
        expect(res.statusCode).toBe(404)
    })
})