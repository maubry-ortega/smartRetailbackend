import { ventaService } from '../services/venta.service.js';

export const ventaController = {
  crearVenta: async (req, res) => {
    const ventaData = req.body;
    try {
      const ventaCreada = await ventaService.crearVenta(ventaData);
      res.status(201).json(ventaCreada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarVentas: async (req, res) => {
    try {
      const ventas = await ventaService.listarVentas();
      res.status(200).json(ventas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarVentaPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const venta = await ventaService.listarVentaPorId(id);
      if (!venta) {
        return res.status(404).json({ error: 'Venta no encontrada' });
      }
      res.status(200).json(venta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  actualizarVenta: async (req, res) => {
    const { id } = req.params;
    const ventaData = req.body;
    try {
      const result = await ventaService.actualizarVenta(id, ventaData);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  eliminarVenta: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await ventaService.eliminarVenta(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};