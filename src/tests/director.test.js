const request = require("supertest");
const app = require("../app");

let id;
test("should GET /directors", async () => {
  const res = await request(app).get("/directors");

  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("should POST /directors", async () => {
  const director = {
    firstName: "Steven",
    lastName: "Spielberg",
    nationality: "american",
    image: "",
    birthday: "1946-12-18",
  };

  const res = await request(app).post("/directors").send(director);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("should PUT /directors/:id", async () => {
  const updatedDirector = {
    firstName: "Steven Allan",
  };

  const res = await request(app).put(`/directors/${id}`).send(updatedDirector);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updatedDirector.name);
});

test("should DELETE /directors/:id", async () => {
  const res = await request(app).delete(`/directors/${id}`);
  expect(res.status).toBe(204);
});
