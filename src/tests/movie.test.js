const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require("../models");

let id;
test("should GET /movies", async () => {
  const res = await request(app).get("/movies");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("should POST /movies", async () => {
  const movie = {
    name: "Los iniciados",
    image: "",
    synopsis:
      "En un futuro cercano dominado por la falta de agua potable, Frank Molina, un rudo periodista, se debe enfrentar a sus demonios para resolver un terrible asesinato y descubrir que en las profundidades de una ciudad oscura nada es lo que parece.",
    releaseYear: 2023,
  };

  const res = await request(app).post("/movies").send(movie);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(movie.name);
  expect(res.body.id).toBeDefined();
});

test("should PUT /movies/:id", async () => {
  const updatedMovie = {
    name: "Los iniciados 2",
  };

  const res = await request(app).put(`/movies/${id}`).send(updatedMovie);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updatedMovie.name);
});

test("should POST /movies/:id/actors", async () => {
  const actor = await Actor.create({
    firstName: "Andrés",
    lastName: "Parra",
    nationality: "colombiano",
    image: "",
    birthday: "1977-09-18",
  });

  const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
  actor.destroy();

  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("should POST /movies/:id/directors", async () => {
  const director = await Director.create({
    firstName: "Juan Felipe",
    lastName: "Orozco",
    nationality: "colombiano",
    image: "",
    birthday: "1978-06-13",
  });

  const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
  director.destroy();

  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("should POST /movies/:id/genres", async () => {
  const genre = await Genre.create({
    name: "mistery",
  });

  const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
  genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("should DELETE /movies/:id", async () => {
  const res = await request(app).delete(`/movies/${id}`);
  expect(res.status).toBe(204);
});
