import pool from '../config/database.js';

export const Sucursal = {

  findAll: async () => {
    const res = await pool.query('SELECT * FROM sucursales');
    return res.rows;
  },

  findById: async (id) => {
    const res = await pool.query('SELECT * FROM sucursales WHERE id=$1', [id]);
    return res.rows[0];
  },

  create: async ({ nombre, ciudad, direccion, telefono, fecha_apertura }) => {
    const res = await pool.query(
      `INSERT INTO sucursales (nombre, ciudad, direccion, telefono, fecha_apertura)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombre, ciudad, direccion, telefono, fecha_apertura]
    );
    return res.rows[0];
  },

  update: async (id, data) => {
    const { nombre, ciudad, direccion, telefono, fecha_apertura } = data;
    const res = await pool.query(
      `UPDATE sucursales
       SET nombre=$1, ciudad=$2, direccion=$3, telefono=$4, fecha_apertura=$5
       WHERE id=$6 RETURNING *`,
      [nombre, ciudad, direccion, telefono, fecha_apertura, id]
    );
    return res.rows[0];
  },

  delete: async (id) => {
    const res = await pool.query('DELETE FROM sucursales WHERE id=$1 RETURNING *', [id]);
    return res.rows[0];
  }

};
