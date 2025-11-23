const dotenv = require('dotenv');
dotenv.config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const createTableSQL = `
CREATE TABLE IF NOT EXISTS links (
  id SERIAL PRIMARY KEY,
  code VARCHAR(10) UNIQUE NOT NULL,
  target_url TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  last_clicked TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
`;

pool.query(createTableSQL).catch((err) => {
  console.error('Error ensuring links table exists:', err);
});

module.exports = pool;
