import { Venta } from '../models/venta.model.js';

export const ventaService = {

  listarVentas: async () => {
    return await Venta.findAll();
  },

  obtenerVentaPorId: async (id) => {
    const venta = await Venta.findById(id);
    if (!venta) throw new Error('Venta no encontrada');
    return venta;
  },

  crearVenta: async (data) => {
    return await Venta.create(data);
  },

  actualizarVenta: async (id, data) => {
    const ventaActualizada = await Venta.update(id, data);
    if (!ventaActualizada) throw new Error('No se pudo actualizar la venta');
    return ventaActualizada;
  },

  eliminarVenta: async (id) => {
    const ventaEliminada = await Venta.delete(id);
    if (!ventaEliminada) throw new Error('Venta no encontrada');
    return { message: 'Venta eliminada correctamente' };
  }

};
