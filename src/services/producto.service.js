import { Producto } from '../models/producto.model.js';

export const productoService = {

  listarProductos: async () => {
    return await Producto.findAll();
  },

  obtenerProductoPorId: async (id) => {
    const producto = await Producto.findById(id);
    if (!producto) throw new Error('Producto no encontrado');
    return producto;
  },

  crearProducto: async (data) => {
    const { nombre, categoria, genero, talla, precio, stock_actual, sucursal_id } = data;
    if (!nombre || !categoria || !genero || !talla || !precio || !stock_actual || !sucursal_id)
      throw new Error('Todos los campos son requeridos');

    return await Producto.create(data);
  },

  actualizarProducto: async (id, data) => {
    const productoActualizado = await Producto.update(id, data);
    if (!productoActualizado) throw new Error('No se pudo actualizar el producto');
    return productoActualizado;
  },

  eliminarProducto: async (id) => {
    const productoEliminado = await Producto.delete(id);
    if (!productoEliminado) throw new Error('Producto no encontrado');
    return { message: 'Producto eliminado correctamente' };
  }

};
