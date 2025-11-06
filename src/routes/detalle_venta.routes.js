import { Router } from 'express';
import { detalleVentaController } from '../controllers/detalle_venta.controller.js';

const router = Router();

router.post('/', detalleVentaController.crearDetalleVenta);
router.get('/', detalleVentaController.listarDetallesVenta);
router.get('/:id', detalleVentaController.listarDetalleVentaPorId);
router.put('/:id', detalleVentaController.actualizarDetalleVenta);
router.delete('/:id', detalleVentaController.eliminarDetalleVenta);

export default router;
