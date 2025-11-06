// ==========================
//  SmartRetailbackend
// ==========================

import dotenv from 'dotenv';
import Backend from './config/server.js';
import pool from './config/database.js';

// Cargar variables de entorno
dotenv.config();

// verifica si esta conectado a supabase
(async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log(`Conectado a Supabase PostgreSQL (${result.rows[0].now})`);
  } catch (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  }
})();

// Inicia el servidor
const PORT = Backend.get('port') || process.env.PORT || 4000;

Backend.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
