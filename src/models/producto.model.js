import pool from '../config/database.js';

export const Producto = {

  findAll: async () => {
    const res = await pool.query('SELECT * FROM productos');
    return res.rows;
  },

  findById: async (id) => {
    const res = await pool.query('SELECT * FROM productos WHERE id=$1', [id]);
    return res.rows[0];
  },

  create: async ({ nombre, categoria, genero, talla, precio, stock_actual, sucursal_id }) => {
    const res = await pool.query(
      `INSERT INTO productos (nombre, categoria, genero, talla, precio, stock_actual, sucursal_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nombre, categoria, genero, talla, precio, stock_actual, sucursal_id]
    );
    return res.rows[0];
  },

  update: async (id, data) => {
    const { nombre, categoria, genero, talla, precio, stock_actual, sucursal_id } = data;
    const res = await pool.query(
      `UPDATE productos
       SET nombre=$1, categoria=$2, genero=$3, talla=$4, precio=$5, stock_actual=$6, sucursal_id=$7, fecha_actualizacion=NOW()
       WHERE id=$8 RETURNING *`,
      [nombre, categoria, genero, talla, precio, stock_actual, sucursal_id, id]
    );
    return res.rows[0];
  },

  delete: async (id) => {
    const res = await pool.query('DELETE FROM productos WHERE id=$1 RETURNING *', [id]);
    return res.rows[0];
  }

};
