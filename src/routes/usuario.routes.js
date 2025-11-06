import { Router } from 'express';
import { usuarioController } from '../controllers/usuario.controller.js';
import { validarTokenMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/login', usuarioController.login);
router.post('/logout', usuarioController.logout);

router.post('/', usuarioController.crearUsuario);
router.get('/', validarTokenMiddleware, usuarioController.listarUsuarios);
router.get('/:id', validarTokenMiddleware, usuarioController.listarUsuarioPorId);
router.put('/:id', validarTokenMiddleware, usuarioController.actualizarUsuario);
router.delete('/:id', validarTokenMiddleware, usuarioController.eliminarUsuario);

export default router;