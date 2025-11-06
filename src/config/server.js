// src/config/server.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

// Rutas
import usuarioRoutes from '../routes/usuario.routes.js';
import rolRoutes from '../routes/rol.routes.js';
import ventaRoutes from '../routes/venta.routes.js';
import productoRoutes from '../routes/producto.routes.js';
import sucursalRoutes from '../routes/sucursal.routes.js';
import detalleVentaRoutes from '../routes/detalle_venta.routes.js';

dotenv.config();

const Backend = express();

// Configuración base
const FRONTEND_URL = 'http://localhost:4200';
Backend.set('port', process.env.PORT || 3002);

// Middlewares
Backend.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

Backend.use(express.json());
Backend.use(express.urlencoded({ extended: true }));
Backend.use(morgan('dev'));

// Rutas principales
Backend.use('/api/usuarios', usuarioRoutes);
Backend.use('/api/roles', rolRoutes);
Backend.use('/api/ventas', ventaRoutes);
Backend.use('/api/productos', productoRoutes);
Backend.use('/api/sucursales', sucursalRoutes);
Backend.use('/api/detalles-venta', detalleVentaRoutes);

// Ruta raíz de prueba
Backend.get('/', (req, res) => {
  res.send('SmartRetail Backend API conectada y lista');
});

export default Backend;
