import jwt from 'jsonwebtoken';
import { listaNegraService } from '../services/ListaNegraService.js';
import 'dotenv/config';

export const validarTokenMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    const token = authHeader.replace('Bearer ', '');
    const tokenEnListaNegra = await listaNegraService.tokenEnListaNegra(token);
    if (tokenEnListaNegra) {
      return res.status(401).json({ error: 'El token está en la lista negra' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Token no válido' });

      req.user = decoded;
      req.id = decoded.id;
      next();
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en validarTokenMiddleware' });
  }
};
