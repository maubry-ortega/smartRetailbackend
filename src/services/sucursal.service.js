import { Sucursal } from '../models/sucursal.model.js';

export const sucursalService = {

  listarSucursales: async () => {
    return await Sucursal.findAll();
  },

  obtenerSucursalPorId: async (id) => {
    const sucursal = await Sucursal.findById(id);
    if (!sucursal) throw new Error('Sucursal no encontrada');
    return sucursal;
  },

  crearSucursal: async (data) => {
    return await Sucursal.create(data);
  },

  actualizarSucursal: async (id, data) => {
    const sucursalActualizada = await Sucursal.update(id, data);
    if (!sucursalActualizada) throw new Error('No se pudo actualizar la sucursal');
    return sucursalActualizada;
  },

  eliminarSucursal: async (id) => {
    const sucursalEliminada = await Sucursal.delete(id);
    if (!sucursalEliminada) throw new Error('Sucursal no encontrada');
    return { message: 'Sucursal eliminada correctamente' };
  }

};
