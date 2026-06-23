import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: String(process.env.DB_USER),
  password: String(process.env.DB_PASSWORD),
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  database: String(process.env.DB_NAME),
});

pool.connect()
  .then((client) => {
    console.log("PostgreSQL Connected ✅");
    client.release();
  })
  .catch((err) => {
    console.error("DB Error ❌", err);
  });

export { pool };