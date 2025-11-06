import { productoService } from '../services/producto.service.js'

export const productoController = {

  crearProducto: async (req, res) => {
    const ProductoData = req.body;
    try {
      const productoCreado = await productoService.crearProducto(ProductoData);
      res.status(201).json(productoCreado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarProductos: async (req, res) => {
    try {
      const productos = await productoService.ListarProductos();
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarProductoPorId: async (req, res) => {
    const id = req.params.id;
    try {
      const productoEncontrado = await productoService.ListarProductosId(id);
      if (!productoEncontrado || productoEncontrado.length === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.status(200).json(productoEncontrado[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  actualizarProducto: async (req, res) => {
    const { id } = req.params;
    const ProductoData = req.body;
    try {
      const result = await productoService.ActualizarProducto(id, ProductoData);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  eliminarProducto: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await productoService.EliminarProducto(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

};
