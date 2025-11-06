import { Router } from 'express';
import { ventaController } from '../controllers/venta.controller.js';

const router = Router();

router.post('/', ventaController.crearVenta);
router.get('/', ventaController.listarVentas);
router.get('/:id', ventaController.listarVentaPorId);
router.put('/:id', ventaController.actualizarVenta);
router.delete('/:id', ventaController.eliminarVenta);

export default router;