import pool from '../config/database.js';

export const Usuario = {

  findAll: async () => {
    const res = await pool.query('SELECT * FROM usuarios');
    return res.rows;
  },

  findById: async (id) => {
    const res = await pool.query('SELECT * FROM usuarios WHERE id=$1', [id]);
    return res.rows[0];
  },

  findByEmail: async (email) => {
    const res = await pool.query('SELECT * FROM usuarios WHERE email=$1', [email]);
    return res.rows;
  },

  create: async ({ username, email, password_hash, rol_id }) => {
    const res = await pool.query(
      `INSERT INTO usuarios (username, email, password_hash, rol_id)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [username, email, password_hash, rol_id]
    );
    return res.rows[0];
  },

  update: async (id, data) => {
    const { username, email, password_hash, rol_id, activo } = data;
    const res = await pool.query(
      `UPDATE usuarios
       SET username=$1, email=$2, password_hash=$3, rol_id=$4, activo=$5
       WHERE id=$6 RETURNING *`,
      [username, email, password_hash, rol_id, activo, id]
    );
    return res.rows[0];
  },

  delete: async (id) => {
    const res = await pool.query('DELETE FROM usuarios WHERE id=$1 RETURNING *', [id]);
    return res.rows[0];
  }

};
