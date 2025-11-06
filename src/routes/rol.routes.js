import { Router } from 'express';
import { rolController } from '../controllers/rol.controller.js';

const router = Router();

router.post('/', rolController.crearRol);
router.get('/', rolController.listarRoles);
router.get('/:id', rolController.listarRolPorId);
router.put('/:id', rolController.actualizarRol);
router.delete('/:id', rolController.eliminarRol);

export default router;