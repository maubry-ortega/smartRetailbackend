const request = require('supertest');
const Backend = require('../src/config/server');
const pool = require('../src/config/database');

jest.setTimeout(30000);

let server;

beforeAll(async () => {
  server = Backend.listen(3001);
  await pool.query('BEGIN');
});

afterAll(async () => {
  await pool.query('ROLLBACK');
  server.close();
});

module.exports = { request, Backend };