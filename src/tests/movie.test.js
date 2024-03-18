const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');

let id;

test('GET /movies trae a todos las peliculas', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe crear una pelicula', async () => {
    const body = {
        "name": "Titanic",
        "image": "https://pics.filmaffinity.jpg",
        "synopsis": "Barquito en el agua",
        "releaseYear": 1980
    }
    const res = await request(app).post('/movies').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('PUT /movies/:id debe actualizar una pelicula', async () => {
    const body = {
        "name": "Titanic actualizado",
    }
    const res = await request(app).put(`/movies/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('POST /movies/:id/actors debe insertar los actores', async () => {
    const actors = await Actor.create({
        "firstName": "Leonardo",
        "lastName": "DiCaprio",
        "nationality": "Estados Unidos",
        "image": "https://image.vip.jpg",
        "birthday": "1977-01-13"
    })
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actors.id]);
    await actors.destroy();

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].firstName).toBe("Leonardo");
});

test('POST /movies/:id/directors debe insertar los directores', async () => {
    const directors = await Director.create({
        "firstName": "Robert",
        "lastName": "Congo",
        "nationality": "Estados Unidos",
        "image": "https://media.jpg",
        "birthday": "1970-04-11"
    })
    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([directors.id]);
    await directors.destroy();
    
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].firstName).toBe("Robert");
});

test('POST /movies/:id/genres debe insertar los generos', async () => {
    const genres = await Genre.create({
        name: "Drama"
    })
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genres.id]);
    await genres.destroy();
   
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Drama");
});

test('DELETE /movies/:id debe eliminar una pelicula', async () => {
    const res = await request(app).delete(`/movies/${id}`)
    expect(res.status).toBe(204);
});