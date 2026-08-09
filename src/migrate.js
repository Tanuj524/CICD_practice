import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsDir = path.join(__dirname, "../migrations");

try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS migrations (
            id SERIAL PRIMARY KEY,
            filename TEXT UNIQUE NOT NULL,
            executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    const files = (await fs.readdir(migrationsDir))
        .filter(file => file.endsWith(".sql"))
        .sort();

    for (const file of files) {
        const result = await pool.query(
            "SELECT 1 FROM migrations WHERE filename = $1",
            [file]
        );

        if (result.rowCount > 0) {
            console.log(`Skipping ${file}`);
            continue;
        }

        const sql = await fs.readFile(
            path.join(migrationsDir, file),
            "utf8"
        );

        console.log(`Running ${file}`);

        await pool.query("BEGIN");

        try {
            await pool.query(sql);

            await pool.query(
                "INSERT INTO migrations (filename) VALUES ($1)",
                [file]
            );

            await pool.query("COMMIT");

            console.log(`Completed ${file}`);
        } catch (error) {
            await pool.query("ROLLBACK");
            throw error;
        }
    }

    await pool.end();

    console.log("Migrations complete");
} catch (error) {
    console.error("Migration failed:", error);

    await pool.end();

    process.exit(1);
}