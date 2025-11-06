import sucursalService from '../services/sucursal.service.js';

export const sucursalController = {
  crearSucursal: async (req, res) => {
    const sucursalData = req.body;
    try {
      const sucursalCreada = await sucursalService.crearSucursal(sucursalData);
      res.status(201).json(sucursalCreada);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarSucursales: async (req, res) => {
    try {
      const sucursales = await sucursalService.listarSucursales();
      res.status(200).json(sucursales);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarSucursalPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const sucursal = await sucursalService.listarSucursalPorId(id);
      if (!sucursal) {
        return res.status(404).json({ error: 'Sucursal no encontrada' });
      }
      res.status(200).json(sucursal);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  actualizarSucursal: async (req, res) => {
    const { id } = req.params;
    const sucursalData = req.body;
    try {
      const result = await sucursalService.actualizarSucursal(id, sucursalData);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  eliminarSucursal: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await sucursalService.eliminarSucursal(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
