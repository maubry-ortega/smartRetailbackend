import usuarioService from '../services/usuario.service.js';

export const usuarioController = {
  crearUsuario: async (req, res) => {
    const usuarioData = req.body;
    try {
      const usuarioCreado = await usuarioService.crearUsuario(usuarioData);
      res.status(201).json(usuarioCreado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarUsuarios: async (req, res) => {
    try {
      const usuarios = await usuarioService.listarUsuarios();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarUsuarioPorId: async (req, res) => {
    const { id } = req.params;
    try {
      const usuario = await usuarioService.listarUsuarioPorId(id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  actualizarUsuario: async (req, res) => {
    const { id } = req.params;
    const usuarioData = req.body;
    try {
      const result = await usuarioService.actualizarUsuario(id, usuarioData);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  eliminarUsuario: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await usuarioService.eliminarUsuario(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      await usuarioService.login(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ error: 'No se proporcionó token de autenticación' });
      }
      await usuarioService.logout(token);
      res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};