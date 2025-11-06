// ==========================
//  🚀 SmartStock AI Backend
// ==========================

import dotenv from 'dotenv';
import Backend from './config/server.js';
import pool from './config/database.js';

// Cargar variables de entorno
dotenv.config();

// Verificar conexión a Supabase PostgreSQL
(async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log(`🟢 Conectado a Supabase PostgreSQL (${result.rows[0].now})`);
  } catch (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
  }
})();

// Inicializar servidor Express
const PORT = Backend.get('port') || process.env.PORT || 4000;

Backend.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
