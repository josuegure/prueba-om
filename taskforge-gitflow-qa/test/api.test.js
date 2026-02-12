const request = require("supertest");
const app = require("../src/app");

describe("TaskForge API", () => {
  test("GET /api/health responde ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  test("GET /api/tasks devuelve array", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /api/tasks valida title", async () => {
    const res = await request(app).post("/api/tasks").send({ title: "a" });
    expect(res.statusCode).toBe(400);
  });

  test("POST /api/tasks crea task", async () => {
    const res = await request(app).post("/api/tasks").send({ title: "Tarea QA" });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Tarea QA");
  });
});
