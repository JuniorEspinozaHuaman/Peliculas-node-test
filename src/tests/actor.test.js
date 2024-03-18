const request = require('supertest');
const app = require('../app');

let id;

test('GET /actors trae a todos los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors debe crear un actor', async () => {
    const body = {
            "firstName": "Leonardo",
            "lastName": "DiCaprio",
            "nationality": "Estados Unidos",
            "image": "https://image.vip.jpg",
            "birthday": "1977-01-13"
    }
    const res = await request(app).post('/actors').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(body.firstName);
});

test('PUT /actors/:id debe actualizar un actor', async () => {
    const body = {
            "firstName": "Leonardo Actualizado",
    }
    const res = await request(app).put(`/actors/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test('DELETE /actors/:id debe eliminar un actor', async () => {
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204);
});
