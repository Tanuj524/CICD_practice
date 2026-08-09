import request from "supertest";
import app from "../src/app.js";
import pool from "../src/db.js";
import { describe, test, expect, afterAll } from "@jest/globals";

describe("Task API", () => {

    test("GET /tasks should return all tasks", async () => {
        const response = await request(app)
            .get("/tasks");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("POST /tasks should create a task", async () => {
        const response = await request(app)
            .post("/tasks")
            .send({
                title: "Test CI/CD"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe("Test CI/CD");
        expect(response.body.completed).toBe(false);
    });

    test("POST /tasks should reject a task without a title", async () => {
        const response = await request(app)
            .post("/tasks")
            .send({});

        expect(response.statusCode).toBe(400);
    });

    test("GET /tasks/:id should return a task", async () => {
    const createResponse = await request(app)
        .post("/tasks")
        .send({
            title: "Task for GET test"
        });

    const id = createResponse.body.id;

    const response = await request(app)
        .get(`/tasks/${id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(id);
});

    test("GET /tasks/:id should return 404 for missing task", async () => {
        const response = await request(app)
            .get("/tasks/9999");

        expect(response.statusCode).toBe(404);
    });

    test("PUT /tasks/:id should update a task", async () => {
    const createResponse = await request(app)
        .post("/tasks")
        .send({
            title: "Task before update"
        });

    const id = createResponse.body.id;

    const response = await request(app)
        .put(`/tasks/${id}`)
        .send({
            title: "Updated task",
            completed: true
        });

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("Updated task");
    expect(response.body.completed).toBe(true);
});

    test("DELETE /tasks/:id should delete a task", async () => {
    const createResponse = await request(app)
        .post("/tasks")
        .send({
            title: "Task to delete"
        });

    const id = createResponse.body.id;

    const response = await request(app)
        .delete(`/tasks/${id}`);

    expect(response.statusCode).toBe(204);
});

});

afterAll(async () => {
    await pool.end();
});