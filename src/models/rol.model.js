import pool from '../config/database.js';

export const Rol = {

  findAll: async () => {
    const res = await pool.query('SELECT * FROM roles');
    return res.rows;
  },

  findById: async (id) => {
    const res = await pool.query('SELECT * FROM roles WHERE id=$1', [id]);
    return res.rows[0];
  },

  create: async (nombre) => {
    const res = await pool.query(
      'INSERT INTO roles (nombre) VALUES ($1) RETURNING *',
      [nombre]
    );
    return res.rows[0];
  },

  update: async (id, nombre) => {
    const res = await pool.query(
      'UPDATE roles SET nombre=$1 WHERE id=$2 RETURNING *',
      [nombre, id]
    );
    return res.rows[0];
  },

  delete: async (id) => {
    const res = await pool.query('DELETE FROM roles WHERE id=$1 RETURNING *', [id]);
    return res.rows[0];
  }

};
