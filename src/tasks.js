import pool from "./db.js";

export async function getTasks() {
    const result = await pool.query(
        "SELECT * FROM tasks ORDER BY id"
    );

    return result.rows;
}

export async function getTaskById(id) {
    const result = await pool.query(
        "SELECT * FROM tasks WHERE id = $1",
        [id]
    );

    return result.rows[0];
}

export async function createTask(title) {
    const result = await pool.query(
        `INSERT INTO tasks (title)
         VALUES ($1)
         RETURNING *`,
        [title]
    );

    return result.rows[0];
}

export async function updateTask(id, title, completed) {
    const result = await pool.query(
        `UPDATE tasks
         SET
            title = COALESCE($1, title),
            completed = COALESCE($2, completed)
         WHERE id = $3
         RETURNING *`,
        [title, completed, id]
    );

    return result.rows[0];
}

export async function deleteTask(id) {
    const result = await pool.query(
        "DELETE FROM tasks WHERE id = $1 RETURNING id",
        [id]
    );

    return result.rowCount > 0;
}