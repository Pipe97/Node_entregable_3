const request = require("supertest");
const app = require("../app");

let id;
test("should GET all genres /genres", async () => {
  const res = await request(app).get("/genres");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("should POST a genre /genres", async () => {
  const genre = {
    name: "comedy",
  };

  const res = await request(app).post("/genres").send(genre);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("should PUT /genre/:id", async () => {
  const updatedGenre = {
    name: "Romantic comedy",
  };

  const res = await request(app).put(`/genres/${id}`).send(updatedGenre);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updatedGenre.name);
});

test("should DELETE /genres/:id", async () => {
  const res = await request(app).delete(`/genres/${id}`);

  expect(res.status).toBe(204);
});
