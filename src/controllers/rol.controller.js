import { rolService } from '../services/rol.services.js';

export const rolController = {
  crearRol: async (req, res) => {
    const rolData = req.body;
    try {
      const rolCreado = await rolService.crearRol(rolData);
      res.status(201).json(rolCreado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarRoles: async (req, res) => {
    try {
      const roles = await rolService.listarRoles();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarRolPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const rol = await rolService.listarRolPorId(id);
      if (!rol) {
        return res.status(404).json({ error: 'Rol no encontrado' });
      }
      res.status(200).json(rol);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  actualizarRol: async (req, res) => {
    const { id } = req.params;
    const rolData = req.body;
    try {
      const result = await rolService.actualizarRol(id, rolData);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  eliminarRol: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await rolService.eliminarRol(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
