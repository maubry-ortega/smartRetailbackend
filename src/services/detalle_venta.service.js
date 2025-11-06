import { DetalleVenta } from '../models/detalle_venta.model.js';

export const detalleVentaService = {

  listarDetalles: async () => {
    return await DetalleVenta.findAll();
  },

  obtenerDetallePorId: async (id) => {
    const detalle = await DetalleVenta.findById(id);
    if (!detalle) throw new Error('Detalle de venta no encontrado');
    return detalle;
  },

  crearDetalle: async (data) => {
    return await DetalleVenta.create(data);
  },

  actualizarDetalle: async (id, data) => {
    const detalleActualizado = await DetalleVenta.update(id, data);
    if (!detalleActualizado) throw new Error('No se pudo actualizar el detalle');
    return detalleActualizado;
  },

  eliminarDetalle: async (id) => {
    const detalleEliminado = await DetalleVenta.delete(id);
    if (!detalleEliminado) throw new Error('Detalle no encontrado');
    return { message: 'Detalle eliminado correctamente' };
  }

};
