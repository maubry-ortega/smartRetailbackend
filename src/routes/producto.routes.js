import { Router } from 'express';
import { productoController } from '../controllers/producto.controller.js';

const router = Router();

router.post('/', productoController.crearProducto);
router.get('/', productoController.listarProductos);
router.get('/:id', productoController.listarProductoPorId);
router.put('/:id', productoController.actualizarProducto);
router.delete('/:id', productoController.eliminarProducto);

export default router;
