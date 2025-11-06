import { detalleVentaService } from '../services/detalle_venta.service.js';

export const detalleVentaController = {
  crearDetalleVenta: async (req, res) => {
    const detalleVentaData = req.body;
    try {
      const detalleVentaCreado = await detalleVentaService.crearDetalleVenta(detalleVentaData);
      res.status(201).json(detalleVentaCreado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarDetallesVenta: async (req, res) => {
    try {
      const detallesVenta = await detalleVentaService.listarDetallesVenta();
      res.status(200).json(detallesVenta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarDetalleVentaPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const detalleVenta = await detalleVentaService.listarDetalleVentaPorId(id);
      if (!detalleVenta) {
        return res.status(404).json({ error: 'Detalle de venta no encontrado' });
      }
      res.status(200).json(detalleVenta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  actualizarDetalleVenta: async (req, res) => {
    const { id } = req.params;
    const detalleVentaData = req.body;
    try {
      const result = await detalleVentaService.actualizarDetalleVenta(id, detalleVentaData);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  eliminarDetalleVenta: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await detalleVentaService.eliminarDetalleVenta(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
