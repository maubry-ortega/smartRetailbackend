import { Rol } from '../models/rol.model.js';

export const rolService = {

  listarRoles: async () => {
    return await Rol.findAll();
  },

  obtenerRolPorId: async (id) => {
    const rol = await Rol.findById(id);
    if (!rol) throw new Error('Rol no encontrado');
    return rol;
  },

  crearRol: async (nombre) => {
    if (!nombre) throw new Error('Nombre de rol es requerido');
    return await Rol.create(nombre);
  },

  actualizarRol: async (id, nombre) => {
    const rolActualizado = await Rol.update(id, nombre);
    if (!rolActualizado) throw new Error('No se pudo actualizar el rol');
    return rolActualizado;
  },

  eliminarRol: async (id) => {
    const rolEliminado = await Rol.delete(id);
    if (!rolEliminado) throw new Error('Rol no encontrado');
    return { message: 'Rol eliminado correctamente' };
  }

};
