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
    const { sucursal_id, usuario_id, metodo_pago, total } = data;
    const res = await pool.query(
      `UPDATE ventas
       SET sucursal_id=$1, usuario_id=$2, metodo_pago=$3, total=$4
       WHERE id=$5 RETURNING *`,
      [sucursal_id, usuario_id, metodo_pago, total, id]
    );
    return res.rows[0];
  },

  delete: async (id) => {
    const res = await pool.query('DELETE FROM ventas WHERE id=$1 RETURNING *', [id]);
    return res.rows[0];
  }

};
