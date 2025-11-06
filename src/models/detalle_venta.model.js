import pool from '../config/database.js';

export const DetalleVenta = {

  findAll: async () => {
    const res = await pool.query('SELECT * FROM detalle_ventas');
    return res.rows;
  },

  findById: async (id) => {
    const res = await pool.query('SELECT * FROM detalle_ventas WHERE id=$1', [id]);
    return res.rows[0];
  },

  create: async ({ venta_id, producto_id, cantidad, precio_unitario }) => {
    const res = await pool.query(
      `INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio_unitario)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [venta_id, producto_id, cantidad, precio_unitario]
    );
    return res.rows[0];
  },

  update: async (id, data) => {
    const { venta_id, producto_id, cantidad, precio_unitario } = data;
    const res = await pool.query(
      `UPDATE detalle_ventas
       SET venta_id=$1, producto_id=$2, cantidad=$3, precio_unitario=$4
       WHERE id=$5 RETURNING *`,
      [venta_id, producto_id, cantidad, precio_unitario, id]
    );
    return res.rows[0];
  },

  delete: async (id) => {
    const res = await pool.query('DELETE FROM detalle_ventas WHERE id=$1 RETURNING *', [id]);
    return res.rows[0];
  }

};
