const request = require('supertest');
const app = require('../app');

let id;

test('GET /directors trae a todos los directores', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors debe crear un director', async () => {
    const body = {
        "firstName": "Robert",
        "lastName": "Congo",
        "nationality": "Estados Unidos",
        "image": "https://media.jpg",
        "birthday": "1970-04-11"
    }
    const res = await request(app).post('/directors').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
});

test('PUT /directors/:id debe actualizar un director', async () => {
    const body = {
            "firstName": "Robert Actualizado",
    }
    const res = await request(app).put(`/directors/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test('DELETE /directors/:id debe eliminar un director', async () => {
    const res = await request(app).delete(`/directors/${id}`)
    expect(res.status).toBe(204);
});