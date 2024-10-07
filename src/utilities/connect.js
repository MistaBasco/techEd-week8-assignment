import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

let db;

export default function connect() {
  if (!db) {
    db = new pg.Pool({
      connectionString: process.env.DB_URL,
    });
  }
  return db;
}
