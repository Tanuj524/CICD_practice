import pool from "./db.js";

const query = `
    CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE
    );
`;

try {
    await pool.query(query);

    console.log("Database initialized");

    await pool.end();
} catch (error) {
    console.error("Database initialization failed:", error);

    await pool.end();

    process.exit(1);
}