const request = require('supertest');
const app = require('../app');

let id;

test('GET /genres trae a todos los géneros', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /genres debe crear un género', async () => {
    const body = {
        "name": "Comedia"
    }
    const res = await request(app).post('/genres').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('PUT /genres/:id debe actualizar un género', async () => {
    const body = {
            "name": "Comedia actualizado",
    }
    const res = await request(app).put(`/genres/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('DELETE /genres/:id debe eliminar un género', async () => {
    const res = await request(app).delete(`/genres/${id}`)
    expect(res.status).toBe(204);
});