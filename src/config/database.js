import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.SUPABASE_HOST,
  user: process.env.SUPABASE_USER,
  password: process.env.SUPABASE_PASSWORD,
  database: process.env.SUPABASE_DB,
  port: process.env.SUPABASE_PORT,
  ssl: { rejectUnauthorized: false } // Supabase exige conexión segura
});

try {
  await pool.connect();
  console.log('Conexión exitosa a la base de datos Supabase');
} catch (err) {
  console.error('Error al conectar con la base de datos', err);
}

export default pool;
