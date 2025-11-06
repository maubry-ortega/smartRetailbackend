import { Router } from 'express';
import { sucursalController } from '../controllers/sucursal.controller.js';

const router = Router();

router.post('/', sucursalController.crearSucursal);
router.get('/', sucursalController.listarSucursales);
router.get('/:id', sucursalController.listarSucursalPorId);
router.put('/:id', sucursalController.actualizarSucursal);
router.delete('/:id', sucursalController.eliminarSucursal);

export default router;
