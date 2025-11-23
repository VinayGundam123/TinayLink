const pool = require('../db');

async function findByCode(code) {
  const { rows } = await pool.query(
    'SELECT code, target_url, clicks, last_clicked, created_at FROM links WHERE code = $1',
    [code]
  );
  return rows[0] || null;
}

async function findByUrl(target_url) {
  const { rows } = await pool.query(
    'SELECT code, target_url, clicks, last_clicked, created_at FROM links WHERE target_url = $1',
    [target_url]
  );
  return rows[0] || null;
}

async function getAll() {
  const { rows } = await pool.query(
    'SELECT code, target_url, clicks, last_clicked, created_at FROM links ORDER BY created_at DESC'
  );
  return rows;
}

async function create({ code, target_url }) {
  const createdAt = new Date();
  const { rows } = await pool.query(
    'INSERT INTO links (code, target_url, created_at) VALUES ($1, $2, $3) RETURNING code, target_url, clicks, last_clicked, created_at',
    [code, target_url, createdAt]
  );
  return rows[0];
}

async function deleteByCode(code) {
  const result = await pool.query('DELETE FROM links WHERE code = $1', [code]);
  return result.rowCount > 0;
}

async function incrementClicksAndGet(code) {
  const clickedAt = new Date();
  const { rows } = await pool.query(
    'UPDATE links SET clicks = clicks + 1, last_clicked = $1 WHERE code = $2 RETURNING code, target_url, clicks, last_clicked, created_at',
    [clickedAt, code]
  );
  return rows[0] || null;
}

module.exports = {
  findByCode,
  findByUrl,
  getAll,
  create,
  deleteByCode,
  incrementClicksAndGet,
};
