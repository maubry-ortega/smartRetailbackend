import pool from '../config/database.js';

export const Venta = {

  findAll: async () => {
    const res = await pool.query('SELECT * FROM ventas');
    return res.rows;
  },

  findById: async (id) => {
    const res = await pool.query('SELECT * FROM ventas WHERE id=$1', [id]);
    return res.rows[0];
  },

  create: async ({ sucursal_id, usuario_id, metodo_pago, total }) => {
    const res = await pool.query(
      `INSERT INTO ventas (sucursal_id, usuario_id, metodo_pago, total)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [sucursal_id, usuario_id, metodo_pago, total || 0]
    );
    return res.rows[0];
  },

  update: async (id, data) => {
    const fields = Object.keys(data);
    const values = Object.values(data);
    const setClause = fields.map((field, index) => `${field}=$${index + 1}`).join(', ');

    const query = `
      UPDATE ventas
      SET ${setClause}
      WHERE id=$${fields.length + 1}
      RETURNING *
    `;
    const allValues = [...values, id];

    const res = await pool.query(query, allValues);
    return res.rows[0];
  },

  delete: async (id) => {
    const res = await pool.query('DELETE FROM ventas WHERE id=$1 RETURNING *', [id]);
    return res.rows[0];
  }

};
