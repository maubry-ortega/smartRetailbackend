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
    const fields = Object.keys(data);
    const values = Object.values(data);
    const setClause = fields.map((field, index) => `${field}=$${index + 1}`).join(', ');

    const query = `
      UPDATE productos
      SET ${setClause}, fecha_actualizacion=NOW()
      WHERE id=$${fields.length + 1}
      RETURNING *
    `;
    const allValues = [...values, id];

    const res = await pool.query(query, allValues);
    return res.rows[0];
  },

  delete: async (id) => {
    const res = await pool.query('DELETE FROM productos WHERE id=$1 RETURNING *', [id]);
    return res.rows[0];
  }

};
