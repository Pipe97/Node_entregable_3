const request = require("supertest");
const app = require("../app");
let id;
test("should GET all movies /actors", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("should POST an actor /actors", async () => {
  const actor = {
    firstName: "Keanu",
    lastName: "Reeves",
    nationality: "canadiense",
    image: "",
    birthday: "1964-09-02",
  };

  const res = await request(app).post("/actors").send(actor);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("should PUT an actor /actors/:id", async () => {
  const actor = {
    firstName: "Keanu Charles",
  };

  const res = await request(app).put(`/actors/${id}`).send(actor);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(actor.name);
});

test("should DELETE /actors/:id", async () => {
  const res = await request(app).delete(`/actors/${id}`);
  expect(res.status).toBe(204);
});
