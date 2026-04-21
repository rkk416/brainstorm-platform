const { Pool } = require("pg")
require("dotenv").config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false  
  }
})

async function initDB() {
  try {

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user'
      );
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS ideas (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        category TEXT,
        session_id INTEGER REFERENCES sessions(id) ON DELETE CASCADE,
        author TEXT,
        votes INTEGER DEFAULT 0
      );
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS votes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        idea_id INTEGER REFERENCES ideas(id),
        UNIQUE(user_id, idea_id)
      );
    `)

    console.log("✅ All tables ready")

  } catch (err) {
    console.error("❌ DB INIT ERROR:", err)
  }
}
initDB()

module.exports = { pool, initDB }
