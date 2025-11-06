import 'dotenv/config';
import pkg from 'pg';
const Pool = pkg.Pool || pkg.default?.Pool

const dbConfig = {
  host: process.env.SUPABASE_HOST,
  user: process.env.SUPABASE_USER,
  password: process.env.SUPABASE_PASSWORD,
  database: process.env.SUPABASE_DB,
  port: Number(process.env.SUPABASE_PORT) || 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

console.log("Connecting with config:", dbConfig);

const pool = new Pool(dbConfig);

(async () => {
  try {
    await pool.query('SELECT NOW()'); 
    console.log('Conectado a Supabase PostgreSQL');
  } catch (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  }
})();

export default pool;
